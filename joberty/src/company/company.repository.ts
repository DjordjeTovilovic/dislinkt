import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from './schemas/company.scheme';
import { NewInterviewDto } from './dto/new-interview.dto';
import { NewSalaryDto } from './dto/new-salary.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { NewReviewDto } from './dto/new-review.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { NewJobOfferDto } from './dto/new-jobOffer.dto';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  save(company: Company) {
    const createdCompany = new this.companyModel(company);
    return createdCompany.save();
  }
  create(createCompanyDto: CreateCompanyDto) {
    const createdCompany = new this.companyModel(createCompanyDto);
    return createdCompany.save();
  }

  findAll() {
    return this.companyModel.find({});
  }

  findOne(companyId: string) {
    return this.companyModel.findOne({ _id: companyId });
  }

  update(companyId: string, updateCompanyDto: UpdateCompanyDto) {
    return this.companyModel.findOneAndUpdate(
      { _id: companyId },
      updateCompanyDto,
      {
        new: true,
      },
    );
  }

  updatePure(id: string, company: Company) {
    const filter = { _id: id };
    return this.companyModel.updateOne(filter, company);
  }

  remove(companyId: string) {
    return this.companyModel.findOneAndDelete({ _id: companyId });
  }

  addJobOffer(companyId: string, newJobOfferDto: NewJobOfferDto) {
    return this.companyModel.findOneAndUpdate(
      { _id: companyId },
      {
        $push: {
          jobOffers: newJobOfferDto,
        },
      },
      { new: true },
    );
  }

  findAllJobOffersForCompany(companyId: string) {
    return this.companyModel
      .find({ _id: companyId })
      .select({ jobOffers: true });
  }

  addReview(companyId: string, newReviewDto: NewReviewDto) {
    return this.companyModel.findOneAndUpdate(
      { _id: companyId },
      { $push: { reviews: newReviewDto } },
      { new: true },
    );
  }

  addSalary(companyId: string, newSalaryDto: NewSalaryDto) {
    return this.companyModel.findOneAndUpdate(
      { _id: companyId },
      {
        $push: {
          salaries: newSalaryDto,
        },
      },
      { new: true },
    );
  }

  addInterview(companyId: string, newInterviewDto: NewInterviewDto) {
    return this.companyModel.findOneAndUpdate(
      { _id: companyId },
      {
        $push: {
          interviews: newInterviewDto,
        },
      },
      { new: true },
    );
  }
}
