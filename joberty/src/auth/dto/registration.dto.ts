import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
