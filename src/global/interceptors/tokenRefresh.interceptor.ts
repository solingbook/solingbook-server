import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

const WHITE_LIST = ['/auth/*'];

@Injectable()
export class TokenRefreshInterceptor implements NestInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest() as Request;
    const res = context.switchToHttp().getResponse();

    const path = req.path;

    if (WHITE_LIST.some((pattern) => this.matchPath(pattern, path))) {
      return next.handle();
    }

    if (req.user.isExpired) {
      const userId = this.extractUserIdFromExpiredToken(req);

      const user = await this.usersService.findOneById(userId);

      // RT 검증
      await this.authService.verifyToken(user.rt);

      // 재발급
      const { accessToken, refreshToken } =
        await this.authService.signTokens(userId);

      await this.usersService.setTokens(userId, accessToken, refreshToken);

      // 쿠키 세팅
      res.cookie('X-Access-Token', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      });

      // req.user 다시 세팅
      req.user.at = accessToken;
      req.user.rt = refreshToken;
    }

    return next.handle();
  }

  private extractUserIdFromExpiredToken(req: Request) {
    return req.user?.userId;
  }

  private matchPath(pattern: string, path: string): boolean {
    if (pattern.endsWith('/*')) {
      const basePattern = pattern.slice(0, -2);
      return path.startsWith(basePattern);
    }
    return pattern === path;
  }
}
