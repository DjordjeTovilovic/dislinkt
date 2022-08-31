import {
  Body,
  Controller,
  Inject,
  Logger,
  OnModuleInit,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { AuthGuard } from './auth.guard';
import {
  AuthServiceClient,
  AUTH_SERVICE_NAME,
  LoginRequest,
  RegistrationRequest,
  ValidateApiTokenRequest,
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

  @UseGuards(AuthGuard)
  @Post('/token')
  async generateApiToken(@Req() req) {
    this.logger.log('generateApiToken.call#jwt id', req.user.id);

    const apiToken = await lastValueFrom(
      this.authService.generateApiToken({ id: req.user.id }).pipe(
        catchError((e) => {
          this.logger.log(e);
          throw new RpcException(e);
        }),
      ),
    );

    return apiToken;
  }

  @Post('/token/validate')
  async validateApiToken(
    @Body() validateApiTokenRequest: ValidateApiTokenRequest,
  ) {
    this.logger.log('validateApiToken.call#body', validateApiTokenRequest);

    const apiToken = await lastValueFrom(
      this.authService.validateApiToken(validateApiTokenRequest).pipe(
        catchError((e) => {
          this.logger.log(e);
          throw new RpcException(e);
        }),
      ),
    );

    return apiToken;
  }
}
