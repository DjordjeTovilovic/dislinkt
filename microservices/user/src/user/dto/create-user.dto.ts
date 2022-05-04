import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(1, 100)
  username: string;

  @IsNotEmpty()
  password: string;

  bio?: string = null;
  image?: string = null;
}
