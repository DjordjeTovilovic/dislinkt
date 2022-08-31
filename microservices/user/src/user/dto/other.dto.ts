import { SkillProto } from '../../protos/user.pb';
import { EducationProto } from '../../protos/user.pb';
import { InterestProto } from '../../protos/user.pb';
import { ExperienceProto } from '../../protos/user.pb';

export class ExperiencesDto {
  experiences: ExperienceProto[];
}

export class InterestsDto {
  interests: InterestProto[];
}

export class EducationsDto {
  educations: EducationProto[];
}

export class SkillsDto {
  skills: SkillProto[];
}
