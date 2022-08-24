import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestController } from './request.controller';
import { RequestRepository } from './request.repository';
import { CreateRequest, CreateRequestSchema } from './request.schema';
import { RequestService } from './requests.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CreateRequest.name, schema: CreateRequestSchema },
    ]),
  ],
  controllers: [RequestController],
  providers: [RequestService, RequestRepository],
  exports: [RequestService],
})
export class RequestModule {}
