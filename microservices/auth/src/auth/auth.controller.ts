import { Controller, Logger } from '@nestjs/common';
import {
  AuthServiceControllerMethods,
  LoggedInRequest,
} from '../protos/auth.pb';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller()
@AuthServiceControllerMethods()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  async login(loginRequest: LoginDto) {
    this.logger.log('login.call#param loginRequest', loginRequest);
    return this.authService.login(loginRequest);
  }

  async loggedIn(jwt: LoggedInRequest) {
    return this.authService.validateToken(jwt.token);
  }
}
