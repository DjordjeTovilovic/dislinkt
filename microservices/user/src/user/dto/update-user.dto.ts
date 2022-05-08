import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  EducationProto,
  ExperienceProto,
  Gender,
  InterestProto,
  SkillProto,
  UpdateUserRequest,
} from '../../protos/user.pb';

export class UpdateUserDto implements UpdateUserRequest {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  bio: string;
  image: string;
  gender: Gender;
  phoneNumber: string;
  birthday: string;
  password: string;
  experiences: ExperienceProto[];
  education: EducationProto[];
  skills: SkillProto[];
  interests: InterestProto[];
  privateProfile: boolean;
}
