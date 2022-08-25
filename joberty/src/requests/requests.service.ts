import { Injectable } from '@nestjs/common';
import { CreateCompanyRequestDto } from 'src/company/dto/create-company-request.dto';
import { RequestRepository } from './request.repository';

@Injectable()
export class RequestService {
  constructor(private requestRepository: RequestRepository) {}
  save(requestDto: CreateCompanyRequestDto) {
    this.requestRepository.save(requestDto);
  }

  findAll() {
    return this.requestRepository.findAll();
  }

  findOne(requestId: string) {
    return this.requestRepository.findOne(requestId);
  }

  remove(requestId: string) {
    return this.requestRepository.remove(requestId);
  }
}
