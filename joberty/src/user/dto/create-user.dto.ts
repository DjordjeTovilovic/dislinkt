export class CreateUserDto {
  username: string;
  password: string;
  role: string;
  name: string;
  lastname: string;
  companiesOwned: string[];
  dislinktToken: string;
}
