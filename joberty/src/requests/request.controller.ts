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

  @Get(':id')
  findOne(@Param('id') requestId: string) {
    return this.requestService.findOne(requestId);
  }

  @Delete(':requestId')
  remove(@Param('requestId') requestId: string) {
    return this.requestService.remove(requestId);
  }

  @Delete()
  removeAll() {
    return this.requestService.removeAll();
  }
}
