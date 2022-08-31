import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { CreateUserRequest, Gender } from '../../protos/user.pb';

export class CreateUserDto implements CreateUserRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(1, 100)
  username: string;

  @IsNotEmpty()
  password: string;

  bio: string;
  image: string;
  gender: Gender;
  phoneNumber: string;
  birthday: string;
  privateProfile: boolean;
}
