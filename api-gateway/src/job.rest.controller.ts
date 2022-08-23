import { Metadata } from '@grpc/grpc-js';
import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { JobServiceClient, JOB_SERVICE_NAME } from './protos/job.pb';

@Controller('jobs')
export class JobRestController implements OnModuleInit {
  private readonly logger = new Logger(JobRestController.name);

  private jobService: JobServiceClient;

  constructor(@Inject(JOB_SERVICE_NAME) private postClient: ClientGrpc) {}

  onModuleInit() {
    this.jobService =
      this.postClient.getService<JobServiceClient>(JOB_SERVICE_NAME);
  }

  @Get()
  async findAll() {
    this.logger.log('findAll.call#');

    const jobs = await lastValueFrom(
      this.jobService.findAll({}).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );

    this.logger.log('findAll.call#return jobs', jobs);
    return jobs;
  }
}
