import { Injectable } from '@nestjs/common';
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
  async getJobById(jobId) {
    return await this.jobRepository.getJobById(jobId);
  }

  async recommendedJobOffers(username) {
    const res = await this.jobRepository.recommendedJobOffers(username);
    return res;
  }
}
