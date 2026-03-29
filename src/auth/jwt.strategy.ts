import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './types/jwtPayload.type';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.['X-Access-Token'],
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  /*
    jwt 토큰에 담긴 payload로 부터 user정보를 조회하여 user객체 반환
    반환시 이후 req객체에 user키로 반환된 객체 접근 가능

    @User() user: UserEntity -> controller에서 사용가능
  */
  async validate(payload: JwtPayload) {
    console.log('test', payload);

    const { sub, exp } = payload;

    const isExpired = Date.now() >= exp * 1000;

    // if ((sub = 'TEST_USER')) {

    // }

    const user = await this.userService.findOneById(sub);

    return { ...user, isExpired };
  }
}
