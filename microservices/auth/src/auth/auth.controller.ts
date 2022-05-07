import { Controller, Logger } from '@nestjs/common';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  LoggedInRequest,
} from '../protos/auth.pb';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  async login(loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  async registration(registrationDto: RegistrationDto) {
    return this.authService.registration(registrationDto);
  }

  async loggedIn(jwt: LoggedInRequest) {
    return this.authService.validateToken(jwt.token);
  }
}
