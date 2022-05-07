import { IsEmail, IsNotEmpty } from 'class-validator';
import { RegistrationRequest } from '../../protos/auth.pb';

export class RegistrationDto implements RegistrationRequest {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  bio: string;

  @IsNotEmpty()
  image: string;
}
