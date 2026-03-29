import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TypedConfigService } from 'src/configs/typedConfig.service';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './types/jwtPayload.type';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    // private readonly usersService: UsersService,
    // private readonly jwtService: JwtService,
    // private readonly configService: TypedConfigService,
    // private readonly authService: AuthService,
    super();
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    console.log(err, user, info, context);

    const req = context.switchToHttp().getRequest<Request>();
    console.log('info.name', info?.name);

    // // AT 만료
    // if (info?.name === 'TokenExpiredError') {
    //   // @ts-ignore
    //   req.isExpired = true;
    //   return null; // 일단 통과
    // }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;

    /*
     토큰 만료시 
      rt 검증
        - rt 유효 -> at, rt 재발급해주고 기존 요청 처리해줌
        - rt 만료 -> 401 Unauthorized 응답
    */

    // const req = context.switchToHttp().getRequest() as Request;
    // const res = context.switchToHttp().getResponse<Response>();
    // const bearerToken = req.headers.authorization;

    // if (!bearerToken) {
    //   throw new UnauthorizedException('유효한 토큰이 아닙니다.');
    // }

    // console.log(req.headers.authorization);

    // const at = bearerToken.slice(bearerToken.indexOf(' ') + 1);
    // console.log(at);

    // let payload: JwtPayload;

    // try {
    //   payload = this.jwtService.verify(at, {
    //     secret: this.configService.get('JWT_SECRET'),
    //   });
    // } catch (err) {
    //   console.error(err);
    //   throw new UnauthorizedException('유효한 토큰이 아닙니다.');
    // }

    // const { sub } = payload;

    // const userInfo = await this.usersService.findOneById(sub);

    // const { rt } = userInfo;

    // try {
    //   this.jwtService.verify(rt, {
    //     secret: this.configService.get('JWT_SECRET'),
    //   });
    // } catch (err) {
    //   console.error(err);
    //   throw new UnauthorizedException('로그인이 만료되었습니다.');
    // }

    // const { accessToken, refreshToken } =
    //   await this.authService.signTokens(sub);

    // await this.usersService.setTokens(sub, accessToken, refreshToken);

    // res.cookie('X-Access-Token', at, {
    //   httpOnly: true, // JS에서 접근 못하게 (보안 핵심)
    //   secure: true, // HTTPS에서만 (배포 시 필수)
    //   sameSite: 'lax', // 필수 옵션
    // });

    // if (info?.name === 'TokenExpiredError') {
    //   throw new UnauthorizedException('토큰 만료됨');
    // }

    // // 기타 에러
    // if (err || !user) {
    //   throw err || new UnauthorizedException();
    // }

    // return user;
  }
}
