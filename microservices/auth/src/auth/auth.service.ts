import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { EncryptionService } from '../encryption/encryption.service';
import { GenerateApiTokenResponse, LoginResponse } from '../protos/auth.pb';
import { UserServiceClient, USER_SERVICE_NAME } from '../protos/user.pb';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);
  private userService: UserServiceClient;

  constructor(
    @Inject(USER_SERVICE_NAME) private userClient: ClientGrpc,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
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
      return { valid: false, user: null };
    }
  }

  // Poseban secret key za ApiToken da se ne bi mogao koristiti za nista drugo
  createJobertyApiToken(user: any): string {
    const payload = { sub: user.id };
    const apiToken = this.jwtService.sign(payload, {
      secret: this.configService.get('API_TOKEN_SECRET'),
      expiresIn: this.configService.get('API_TOKEN_EXPIRES_IN'),
    });
    return apiToken;
  }

  validateApiToken(apiToken: string) {
    try {
      this.jwtService.verify(apiToken, {
        secret: this.configService.get('API_TOKEN_SECRET'),
      });
      const user = this.jwtService.decode(apiToken);
      return { valid: true, userId: user.sub };
    } catch (e) {
      this.logger.log(e);
      return { valid: false, userId: null };
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

    if (this.encryptionService.compare(password, user?.password)) {
      return user;
    }

    return null;
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    const token = this.createToken(user);

    return {
      token,
    };
  }

  async registration(registrationDto: RegistrationDto) {
    registrationDto.password = await this.encryptionService.hash(
      registrationDto.password,
    );

    const user = await lastValueFrom(
      this.userService.create(registrationDto).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );

    return user;
  }

  async generateApiToken(id: string): Promise<GenerateApiTokenResponse> {
    const user = await lastValueFrom(
      this.userService.findById({ id }).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );
    const apiToken = this.createJobertyApiToken(user);

    return {
      apiToken,
    };
  }
}
