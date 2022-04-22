import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RpcExceptionInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        this.logger.error(error);
        if (error instanceof HttpException) return next.handle();
        if (error instanceof RpcException) {
          const e = error.getError();
          if (e['code'] == status.NOT_FOUND) {
            throw new NotFoundException(e['details']);
          }
        } else throw error;
      }),
    );
  }
}
