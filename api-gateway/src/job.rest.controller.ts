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
import {
  AddJobProto,
  JobServiceClient,
  JOB_SERVICE_NAME,
} from './protos/job.pb';

@Controller('jobs')
export class JobRestController implements OnModuleInit {
  private readonly logger = new Logger(JobRestController.name);

  private jobService: JobServiceClient;

  constructor(@Inject(JOB_SERVICE_NAME) private jobClient: ClientGrpc) {}

  onModuleInit() {
    this.jobService =
      this.jobClient.getService<JobServiceClient>(JOB_SERVICE_NAME);
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

  @Get('/job/:jobId')
  async findById(@Param('jobId') jobId: string) {
    this.logger.log('findById.call#Param jobID:', jobId);

    const job = await this.jobService.getJobById({ token: jobId }).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );

    this.logger.log('findAll.call#return jobs', job);
    return job;
  }

  @Post('/addJob')
  async addJob(@Body() job: AddJobProto) {
    this.logger.log('addJob.call#body:job', job);
    return await this.jobService.addJob(job);
  }

  @UseGuards(AuthGuard)
  @Get('/jobOffers/recommended')
  async recommendedJobOffers(@Req() req) {
    this.logger.log('recommendedJobOffers#Req token', req.user);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const jobs = await this.jobService.recommendedJobOffers(null, metadata);

    return jobs;
  }
}
