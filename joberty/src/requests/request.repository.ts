import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyRequestDto } from 'src/company/dto/create-company-request.dto';
import { CreateRequest, CreateRequestDocument } from './request.schema';

@Injectable()
export class RequestRepository {
  constructor(
    @InjectModel(CreateRequest.name)
    private requestModel: Model<CreateRequestDocument>,
  ) {}

  save(requestDto: CreateCompanyRequestDto) {
    const createdRequest = new this.requestModel(requestDto);
    return createdRequest.save();
  }

  findAll() {
    return this.requestModel.find({});
  }

  findOne(requestId: string) {
    return this.requestModel.findOne({ _id: requestId });
  }

  removeAll() {
    return this.requestModel.remove({});
  }

  remove(requestId: string) {
    const filter = { _id: requestId };

    return this.requestModel.deleteOne(filter);
  }
}
