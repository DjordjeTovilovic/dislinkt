import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import {
  CreateUserRequest,
  EducationProto,
  ExperienceProto,
  Gender,
  InterestProto,
  SkillProto,
} from '../../protos/user.pb';

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
  experiences: ExperienceProto[];
  education: EducationProto[];
  skills: SkillProto[];
  interests: InterestProto[];
  privateProfile: boolean;
}
