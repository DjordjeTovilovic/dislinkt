import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserProto } from '../../protos/user.pb';

export class UserDto implements UserProto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  bio: string;
  image: string;

  password: string;
}
