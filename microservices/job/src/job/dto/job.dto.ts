import { SkillProto } from 'src/protos/auth.pb';
import { JobProto } from '../../protos/job.pb';

export class JobDto implements JobProto {
  id: string;
  position: string;
  seniority: string;
  description: string;
  company: string;
  skillsRequired: string[];
}
