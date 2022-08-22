import { Controller, Logger } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  JobServiceController,
  JobServiceControllerMethods,
} from '../protos/job.pb';

@Controller()
@JobServiceControllerMethods()
export class JobController implements JobServiceController {
  constructor(private readonly jobService: JobService) {}
  private readonly logger = new Logger(JobController.name);

  async findAll() {
    // return this.jobService.findAll(createPostDto, username);
    return { token: 'agad' };
  }
}
