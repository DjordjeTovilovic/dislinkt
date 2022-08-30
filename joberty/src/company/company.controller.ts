import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { NewInterviewDto } from './dto/new-interview.dto';
import { NewSalaryDto } from './dto/new-salary.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { NewReviewDto } from './dto/new-review.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { NewJobOfferDto } from './dto/new-jobOffer.dto';
import { Roles } from 'src/decorators/role';
import { Role } from 'src/enums/role';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { CreateCompanyRequestDto } from './dto/create-company-request.dto';
import { Headers } from '@nestjs/common';
import { RequestService } from 'src/requests/requests.service';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private authService: AuthService,
    private userService: UserService,
    private requestService: RequestService,
  ) {}

  @Post('/enable/:requestId')
  async confirmRequest(@Param('requestId') requestId: string) {
    const req = await this.requestService.findOne(requestId);
    await this.companyService.enable(req.company.id);

    this.companyService.setUserAsCompanyOwner(req.company.id, req.user.id);

    return this.requestService.remove(req.id);
  }

  @Post()
  async create(
    @Headers('Authorization') token: string,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    const validToken = token.split(' ')[1];
    const { valid, user } = this.authService.validateToken(validToken);
    const company = await this.companyService.create(createCompanyDto);
    const newUser = await this.userService.findOne(user.id);

    const requestDto = new CreateCompanyRequestDto();
    requestDto.user = newUser;
    requestDto.company = company;

    this.requestService.save(requestDto);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':companyId')
  findOne(@Param('companyId') companyId: string) {
    return this.companyService.findOne(companyId);
  }

  @Patch(':companyId')
  update(
    @Param('companyId') companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(companyId, updateCompanyDto);
  }
  @Roles(Role.Owner)
  @Delete(':companyId')
  remove(@Param('companyId') companyId: string) {
    return this.companyService.remove(companyId);
  }
  @Post(':companyId/jobs')
  addJobOffer(
    @Param('companyId') companyId: string,
    @Body() newJobOfferDto: NewJobOfferDto,
  ) {
    return this.companyService.addJobOffer(companyId, newJobOfferDto);
  }

  @Get(':companyId/jobs')
  findAllJobOffersForCompany(@Param('companyId') companyId: string) {
    return this.companyService.findAllJobOffersForCompany(companyId);
  }

  @Get(':companyId/jobs/:jobId/promote')
  promoteJobOfferOnDislinkt(
    @Param('companyId') companyId: string,
    @Param('jobId') jobId: string,
  ) {
    return this.companyService.promoteJobOfferOnDislinkt(companyId, jobId);
  }

  @Post(':companyId/reviews')
  addReview(
    @Param('companyId') companyId: string,
    @Body() newReviewDto: NewReviewDto,
  ) {
    return this.companyService.addReview(companyId, newReviewDto);
  }

  @Post(':companyId/salaries')
  addSalary(
    @Param('companyId') companyId: string,
    @Body() newSalaryDto: NewSalaryDto,
  ) {
    return this.companyService.addSalary(companyId, newSalaryDto);
  }

  @Post(':companyId/interviews')
  addInterview(
    @Param('companyId') companyId: string,
    @Body() newInterviewDto: NewInterviewDto,
  ) {
    return this.companyService.addInterview(companyId, newInterviewDto);
  }
}
