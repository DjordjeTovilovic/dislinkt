import { IsNotEmpty } from 'class-validator';
import { LoginRequest } from '../../protos/auth.pb';

export class LoginDto implements LoginRequest {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}
