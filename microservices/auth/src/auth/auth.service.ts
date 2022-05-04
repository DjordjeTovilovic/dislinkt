import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { compareSync } from 'bcrypt';
import { catchError, lastValueFrom } from 'rxjs';
import { LoginResponse } from '../protos/auth.pb';
import { UserServiceClient, USER_SERVICE_NAME } from '../protos/user.pb';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);
  private userService: UserServiceClient;
  constructor(
    @Inject(USER_SERVICE_NAME) private userClient: ClientGrpc,
    private readonly jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.userService =
      this.userClient.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  createToken(user: any): string {
    const payload = { user, sub: user.id };
    const token = this.jwtService.sign(payload);
    return token;
  }

  validateToken(token: string) {
    try {
      const res = this.jwtService.verify(token);
      return { valid: true, user: res.user };
    } catch (e) {
      this.logger.log(e);
      return { valid: false };
    }
  }

  async validateUser(username: string, password: string) {
    const user = await lastValueFrom(
      this.userService.findByUsername({ username }).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );
    if (compareSync(password, user?.password)) {
      return user;
    }
    return null;
  }

  async login(loginRequest: LoginDto): Promise<LoginResponse> {
    const user = await this.validateUser(
      loginRequest.username,
      loginRequest.password,
    );
    const token = this.createToken(user);

    return {
      token,
    };
  }
}
