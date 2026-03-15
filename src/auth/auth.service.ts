import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './types/jwtPayload.type';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UserRole } from 'src/users/constant/role.enum';

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

    if (emailUser.length) throw new ConflictException('email already used');

    const nicknameUser = await this.userService.findUser({
      where: { nickname },
    });

    if (nicknameUser.length)
      throw new ConflictException('nickname already used');

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

    if (!dbUser) throw new NotFoundException('User not found');

    const dbPw = dbUser.password;

    const isValid = await this.verifyPassword(password, dbPw);

    if (!isValid) throw new UnauthorizedException('password incorrect');

    const { accessToken, refreshToken } = await this.signTokens(dbUser.userId);

    await this.userService.setTokens(dbUser.userId, accessToken, refreshToken);

    return { accessToken };
  }

  async hash(password: string) {
    return bcrypt.hash(password, 10);
  }

  private async signTokens(userId: string) {
    const payload: JwtPayload = { sub: userId };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async verifyPassword(newPw: string, dbPw: string) {
    return await bcrypt.compare(newPw, dbPw);
  }
}
