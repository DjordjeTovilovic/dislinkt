import { CompanyRepository } from './company.repository';
import { NewInterviewDto } from './dto/new-interview.dto';
import { NewSalaryDto } from './dto/new-salary.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { NewReviewDto } from './dto/new-review.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { NewJobOfferDto } from './dto/new-jobOffer.dto';
import { AuthService } from 'src/auth/auth.service';

import { UserService } from 'src/user/user.service';
import { Injectable, Logger } from '@nestjs/common';
import { Role } from 'src/enums/role';
import { PromoteJobOfferDto } from './dto/promote-jobOffer.dto';

import axios from 'axios';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async setUserAsCompanyOwner(companyId: string, userId: string) {
    const user = await this.userService.findOne(userId);
    const company = await this.companyRepository.findOne(companyId);
    user.companiesOwned = company;
    user.roles[0] = Role.Owner;
    return this.userService.updatePure(user.id, user);
  }

  async enable(companyId: string) {
    const company = await this.companyRepository.findOne(companyId);
    company.enabled = true;
    return this.companyRepository.updatePure(company.id, company);
  }

  create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.create(createCompanyDto);
  }

  findAll() {
    return this.companyRepository.findAll();
  }

  findOne(companyId: string) {
    return this.companyRepository.findOne(companyId);
  }

  update(companyId: string, updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepository.update(companyId, updateCompanyDto);
  }

  remove(companyId: string) {
    return this.companyRepository.remove(companyId);
  }

  async findJobOffer(companyId: string, jobId: string) {
    const company = await this.findOne(companyId);
    const jobOffer = company.jobOffers.find(
      (jobOffer) => jobOffer.id === jobId,
    );
    return jobOffer.toObject();
  }

  async promoteJobOfferOnDislinkt(job: PromoteJobOfferDto) {
    const res = await axios.post('http://localhost:3000/auth/token/validate', {
      apiToken: job.dislinktToken,
    });
    if (res.data.valid) {
      const kek = await axios.post('http://localhost:3000/jobs/addjob', {
        ...job,
        userId: res.data.userId,
      });
      return { valid: true };
    } else return { valid: false };
  }

  addJobOffer(companyId: string, newJobOfferDto: NewJobOfferDto) {
    return this.companyRepository.addJobOffer(companyId, newJobOfferDto);
  }

  findAllJobOffersForCompany(companyId: string) {
    return this.companyRepository.findAllJobOffersForCompany(companyId);
  }

  addReview(companyId: string, newReviewDto: NewReviewDto) {
    return this.companyRepository.addReview(companyId, newReviewDto);
  }

  addSalary(companyId: string, newSalaryDto: NewSalaryDto) {
    return this.companyRepository.addSalary(companyId, newSalaryDto);
  }

  addInterview(companyId: string, newInterviewDto: NewInterviewDto) {
    return this.companyRepository.addInterview(companyId, newInterviewDto);
  }
}
