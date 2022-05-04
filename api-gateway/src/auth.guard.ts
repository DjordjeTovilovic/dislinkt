import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { AuthServiceClient, AUTH_SERVICE_NAME } from './protos/auth.pb';

@Injectable()
export class AuthGuard implements CanActivate {
  private authService: AuthServiceClient;
  constructor(@Inject(AUTH_SERVICE_NAME) private authClient: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const res = await lastValueFrom(
      this.authService
        .loggedIn({ token: req.headers['authorization']?.split(' ')[1] })
        .pipe(
          catchError((e) => {
            throw new RpcException(e);
          }),
        ),
    );
    req.user = res.user;
    return res.valid;
  }
}
