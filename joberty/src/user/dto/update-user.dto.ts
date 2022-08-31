import { PartialType } from '@nestjs/mapped-types';
import { Role } from 'src/enums/role';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  roles?: Role[];
}
