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
}
