import { Metadata } from '@grpc/grpc-js';
import { Controller, Logger } from '@nestjs/common';
import {
  AddJobProto,
  Empty,
  JobProto,
  JobId,
  JobServiceController,
  JobServiceControllerMethods,
} from '../protos/job.pb';
import { JobService } from './job.service';

@Controller()
@JobServiceControllerMethods()
export class JobController implements JobServiceController {
  constructor(private readonly jobService: JobService) {}
  private readonly logger = new Logger(JobController.name);

  async findAll() {
    //return this.jobService.findAll(createPostDto, username);
    return null;
  }
  async getJobById(jobId: JobId) {
    return await this.jobService.getJobById(jobId.token);
  }

  async addJob(job: AddJobProto) {
    return await this.jobService.addJob(job);
  }

  async recommendedJobOffers(request: Empty, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return await this.jobService.recommendedJobOffers(username);
  }
}
