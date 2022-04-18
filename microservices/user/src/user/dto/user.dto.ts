import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  bio?: string = null;
  image?: string = null;
}
