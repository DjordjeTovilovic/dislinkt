import {
  Body,
  Controller,
  Inject,
  Logger,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import {
  AuthServiceClient,
  AUTH_SERVICE_NAME,
  LoginRequest,
  RegistrationRequest,
} from './protos/auth.pb';

@Controller('auth')
export class AuthRestController implements OnModuleInit {
  private readonly logger = new Logger(AuthRestController.name);

  private authService: AuthServiceClient;
  constructor(@Inject(AUTH_SERVICE_NAME) private authClient: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('/login')
  async login(@Body() loginRequest: LoginRequest) {
    this.logger.log('login.call#body loginRequest', loginRequest);

    const user = await lastValueFrom(
      this.authService.login(loginRequest).pipe(
        catchError((e) => {
          this.logger.log(e);
          throw new RpcException(e);
        }),
      ),
    );

    this.logger.log('login.call#return', user);
    return user;
  }

  @Post('/registration')
  async registration(@Body() registrationRequest: RegistrationRequest) {
    this.logger.log(
      'registration.call#body registrationRequest',
      registrationRequest,
    );

    const user = await lastValueFrom(
      this.authService.registration(registrationRequest).pipe(
        catchError((e) => {
          this.logger.log(e);
          throw new RpcException(e);
        }),
      ),
    );

    this.logger.log('registration.call#return', user);
    return user;
  }
}
