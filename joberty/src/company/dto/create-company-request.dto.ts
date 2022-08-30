import { User } from 'src/user/schemas/user.schema';
import { Company } from '../schemas/company.scheme';

export class CreateCompanyRequestDto {
  user: User;
  company: Company;
}
