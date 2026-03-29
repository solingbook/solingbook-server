import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './types/jwtPayload.type';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UserRole } from 'src/users/constant/role.enum';
import { ENotFoundException } from 'src/global/exceptions/ENotFoundException';
import { ERROR_CODE } from 'src/global/constant/errorCode.constant';
import { EConflictException } from 'src/global/exceptions/EConflictException';
import { EUnauthorizedException } from 'src/global/exceptions/EUnauthorizedException';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private jwtService: JwtService,
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

  async hash(password: string) {
    return bcrypt.hash(password, 10);
  }

  async signTokens(userId: string) {
    const payload: JwtPayload = { sub: userId };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    };
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

  private async verifyPassword(newPw: string, dbPw: string) {
    return await bcrypt.compare(newPw, dbPw);
  }
}
