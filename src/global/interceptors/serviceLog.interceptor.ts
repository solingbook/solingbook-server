import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CreateApiLogDto } from 'src/service-logs/dto/createApiLog.dto';
import { CreateApiLogEvent } from 'src/service-logs/event/apiLog.event';
import { EVENT_KEY } from '../constant/event.constant';

@Injectable()
export class ServiceLogInterceptor implements NestInterceptor {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest() as Request;
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        const responseTimeMs = Date.now() - start;

        const dto: CreateApiLogDto = {
          userId: (req as any).user?.userId ?? null,
          method: req.method,
          endpoint: req.originalUrl,
          statusCode: res.statusCode,
          responseTimeMs,
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
        };

        this.eventEmitter.emitAsync(
          EVENT_KEY.CREATE_API_LOG,
          new CreateApiLogEvent(dto),
        );
      }),

      catchError((err) => {
        const responseTimeMs = Date.now() - start;

        const dto: CreateApiLogDto = {
          userId: (req as any).user ?? null,
          method: req.method,
          endpoint: req.originalUrl,
          statusCode: err.status ?? 500,
          responseTimeMs,
          data: err.message,
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
        };

        this.eventEmitter.emitAsync(
          EVENT_KEY.CREATE_API_LOG,
          new CreateApiLogEvent(dto),
        );

        return throwError(() => err);
      }),
    );
  }
}
