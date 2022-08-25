import { Module, OnModuleInit } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JobRepository } from './job.repository';
import { Neo4jService } from 'nest-neo4j/dist';

@Module({
  controllers: [JobController],
  providers: [JobService, JobRepository],
})
export class JobModule implements OnModuleInit {
  constructor(private readonly neo4jService: Neo4jService) {}

  async onModuleInit() {
    await this.neo4jService
      .write(`CREATE CONSTRAINT ON (j:Job) ASSERT j.id IS UNIQUE`)
      .catch(() => {});
  }
}
