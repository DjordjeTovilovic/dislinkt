import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCompanyRequestDto } from 'src/company/dto/create-company-request.dto';
import { RequestService } from './requests.service';

@Controller('requests')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Post()
  save(@Body() requestDto: CreateCompanyRequestDto) {
    return this.requestService.save(requestDto);
  }

  @Get()
  findAll() {
    return this.requestService.findAll();
  }

  @Delete(':requestId')
  remove(@Param('requestId') requestId: string) {
    return this.requestService.remove(requestId);
  }
}
