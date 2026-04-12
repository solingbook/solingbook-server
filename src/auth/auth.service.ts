import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { EmailVerificationPayload, JwtPayload } from './types/jwtPayload.type';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UserRole } from 'src/users/constant/role.enum';
import { ENotFoundException } from 'src/global/exceptions/ENotFoundException';
import { ERROR_CODE } from 'src/global/constant/errorCode.constant';
import { EConflictException } from 'src/global/exceptions/EConflictException';
import { EUnauthorizedException } from 'src/global/exceptions/EUnauthorizedException';
import { EmailVerificationDto } from './dto/emailVerification.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { DeleteAccountDto } from './dto/deleteAccount.dto';
import { NodeMailer } from './providor/nodeMailer';
import { TypedConfigService } from 'src/configs/typedConfig.service';
import { EServiceUnavailableException } from 'src/global/exceptions/EServiceUnavailableException';
import { EmailVerificationPurpose } from './constant/emailVerificationPurpose.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: TypedConfigService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly nodeMailer: NodeMailer,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, nickname, password } = signUpDto;

    const emailUser = await this.userService.findUser({
      where: { email },
    });

    if (emailUser.length)
      throw new EConflictException({
        message: '이미 존재하는 이메일 입니다.',
        errorCode: ERROR_CODE.EMAIL_ALREADY_USED,
      });

    const nicknameUser = await this.userService.findUser({
      where: { nickname },
    });

    if (nicknameUser.length)
      throw new EConflictException({
        message: '이미 존재하는 닉네임 입니다.',
        errorCode: ERROR_CODE.NICKNAME_ALREADY_USED,
      });

    // TODO: 비밀번호 양식검사 보완하기

    const hashedPw = await this.hash(password);

    const userInfo: CreateUserDto = {
      ...signUpDto,
      password: hashedPw,
      role: UserRole.MEMBER,
    };

    return this.userService.createUser(userInfo);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const [dbUser] = await this.userService.findUser({
      where: { email },
      select: {
        userId: true,
        password: true,
      },
    });

    if (!dbUser)
      throw new ENotFoundException({
        message: '존재하지 않는 이메일입니다.',
        errorCode: ERROR_CODE.USER_NOT_FOUND,
      });

    const dbPw = dbUser.password;

    const isValid = await this.verifyPassword(password, dbPw);

    if (!isValid)
      throw new EUnauthorizedException({
        message: '비밀번호가 일치하지 않습니다.',
        errorCode: ERROR_CODE.INVALID_PASSWORD,
      });

    const { accessToken, refreshToken } = await this.signTokens(dbUser.userId);

    await this.userService.setTokens(dbUser.userId, accessToken, refreshToken);

    return { accessToken };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const payload = await this.verifyEmailToken(
      dto.token,
      EmailVerificationPurpose.RESET_PASSWORD,
    );

    const user = await this.userService.findOneByEmail(payload.sub);
    const hashedPassword = await this.hash(dto.newPassword);
    await this.userService.resetPassword(user.userId, hashedPassword);
  }

  async deleteAccount(dto: DeleteAccountDto) {
    const payload = await this.verifyEmailToken(
      dto.token,
      EmailVerificationPurpose.DELETE_ACCOUNT,
    );

    const user = await this.userService.findOneByEmail(payload.sub);
    await this.userService.archiveDeletedUser(user, dto.deletionReason);
  }

  async sendVerificationEmail(emailVerificationDto: EmailVerificationDto) {
    const { email, purpose } = emailVerificationDto;

    await this.validateByPurpose(email, purpose);

    const token = await this.signEmailVerificationToken(email, purpose);
    const { subject, path } = this.getMailConfig(purpose);

    try {
      await this.nodeMailer.sendEmail({
        to: email,
        subject,
        link: `${this.configService.get('BASE_URL')}/${path}?t=${token}`,
      });
    } catch (err) {
      console.error(err);
      throw new EServiceUnavailableException({
        message: '이메일 전송에 실패했습니다.',
        errorCode: ERROR_CODE.EMAIL_SEND_FAILURE,
      });
    }
  }

  private async validateByPurpose(
    email: string,
    purpose: EmailVerificationPurpose,
  ) {
    const users = await this.userService.findUser({ where: { email } });
    const user = users[0];

    switch (purpose) {
      case EmailVerificationPurpose.SIGNUP:
        if (user)
          throw new EConflictException({
            message: '이미 존재하는 이메일입니다.',
            errorCode: ERROR_CODE.EMAIL_ALREADY_USED,
          });
        break;

      case EmailVerificationPurpose.RESET_PASSWORD:
      case EmailVerificationPurpose.DELETE_ACCOUNT:
        if (!user)
          throw new ENotFoundException({
            message: '존재하지 않는 이메일입니다.',
            errorCode: ERROR_CODE.USER_NOT_FOUND,
          });
        break;
    }
  }

  private getMailConfig(purpose: EmailVerificationPurpose) {
    const config = {
      [EmailVerificationPurpose.SIGNUP]: {
        subject: '[솔링북] 회원가입 이메일 인증',
        path: 'signup',
      },
      [EmailVerificationPurpose.RESET_PASSWORD]: {
        subject: '[솔링북] 비밀번호 재설정 이메일 인증',
        path: 'reset-password',
      },
      [EmailVerificationPurpose.DELETE_ACCOUNT]: {
        subject: '[솔링북] 회원탈퇴 이메일 인증',
        path: 'delete-account',
      },
    };
    return config[purpose];
  }

  // async emailVerificationSignup(emailVerificationDto: EmailVerificationDto) {
  //   const { email } = emailVerificationDto;

  //   const [user] = await this.userService.findOneByEmail(email);

  //   if (user) {
  //     throw new EConflictException({
  //       message: '이미 존재하는 이메일 입니다.',
  //       errorCode: ERROR_CODE.EMAIL_ALREADY_USED,
  //     });
  //   }

  //   const token = await this.signEmailVerificationToken(email);

  //   try {
  //     await this.nodeMailer.sendEmail({
  //       to: email,
  //       subject: '[솔링북] 회원가입 이메일 인증을 위한 링크입니다.',
  //       link: `${this.configService.get('BASE_URL')}/signup?t=${token}`,
  //     });
  //   } catch (err) {
  //     console.error(err);

  //     throw new EServiceUnavailableException({
  //       message: '이메일 전송에 실패했습니다.',
  //       errorCode: ERROR_CODE.EMAIL_SEND_FAILURE,
  //     });
  //   }
  // }

  async hash(password: string) {
    return bcrypt.hash(password, 10);
  }

  async signEmailVerificationToken(
    email: string,
    purpose: EmailVerificationPurpose,
  ) {
    const payload: EmailVerificationPayload = { sub: email, purpose };

    return this.jwtService.sign(payload, { expiresIn: '5m' });
  }

  async signTokens(userId: string) {
    const payload: JwtPayload = { sub: userId };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  }

  async verifyToken(token: string) {
    try {
      this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
    } catch (err) {
      console.error(err);

      throw new EUnauthorizedException({
        message: '유효한 토큰이 아닙니다.',
        errorCode: ERROR_CODE.INVALID_TOKEN,
      });
    }
  }

  async verifyEmailToken(
    token: string,
    expectedPurpose: EmailVerificationPurpose,
  ) {
    try {
      const payload = this.jwtService.verify<EmailVerificationPayload>(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      if (payload.purpose !== expectedPurpose) {
        throw new EUnauthorizedException({
          message: '토큰 목적이 일치하지 않습니다.',
          errorCode: ERROR_CODE.WRONG_TOKEN_PURPOSE,
        });
      }
      return payload;
    } catch (err) {
      console.error(err);
      throw new EUnauthorizedException({
        message: '유효한 토큰이 아닙니다.',
        errorCode: ERROR_CODE.INVALID_TOKEN,
      });
    }
  }

  private async verifyPassword(newPw: string, dbPw: string) {
    return await bcrypt.compare(newPw, dbPw);
  }
}
