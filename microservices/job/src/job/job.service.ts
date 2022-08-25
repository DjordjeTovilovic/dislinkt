import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobRepository } from './job.repository';

@Injectable()
export class JobService {
  constructor(private readonly jobRepository: JobRepository) {}
  findAll() {
    return this.jobRepository.findAll();
  }

  async addJob(job) {
    return await this.jobRepository.addJob(job);
  }

  async recommendedJobOffers(username) {
    const res = await this.jobRepository.recommendedJobOffers(username);
    console.log(res);
    return res;
  }
}
