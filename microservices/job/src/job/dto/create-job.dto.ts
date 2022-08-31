import { JobProto } from 'src/protos/job.pb';

export class CreateJobDto implements JobProto {
  id: string;
  position: string;
  seniority: string;
  description: string;
  skillsRequired: string[];
  company: string;
}
