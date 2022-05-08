import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  EducationProto,
  ExperienceProto,
  InterestProto,
  RegistrationRequest,
  SkillProto,
} from '../../protos/auth.pb';
import { Gender } from '../../protos/user.pb';

export class RegistrationDto implements RegistrationRequest {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

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
