import { Injectable } from '@nestjs/common';
import { Role } from 'src/enums/role';
import { RegistrationDto } from '../auth/dto/registration.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  save(user: User) {
    return this.userRepository.save(user);
  }

  async changeRoleToOwner(userId: string) {
    const user = await this.findOne(userId);
    user.roles[0] = Role.Owner;
    return this.userRepository.updatePure(user.id, user);
  }

  create(registrationDto: RegistrationDto) {
    return this.userRepository.create(registrationDto);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  findByUsername(username: string) {
    return this.userRepository.findByUsername(username);
  }

  updatePure(id: string, user: User) {
    return this.userRepository.updatePure(id, user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.remove(id);
  }

  connectToDislinktAccount(userId: string, token: string) {
    const updateUserDto: UpdateUserDto = { dislinktToken: token };
    return this.userRepository.update(userId, updateUserDto);
  }
}
