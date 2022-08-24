import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { EncryptionService } from './encryption.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
  ) {}

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
      return { valid: false, user: null };
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (
      user &&
      (await this.encryptionService.compare(password, user.password))
    ) {
      delete user.password;
      return user;
    }

    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (user === null) return null;

    const token = this.createToken(user);

    return {
      token,
    };
  }

  async registration(registrationDto: RegistrationDto) {
    registrationDto.password = await this.encryptionService.hash(
      registrationDto.password,
    );

    return this.userService.create(registrationDto);
  }
}
