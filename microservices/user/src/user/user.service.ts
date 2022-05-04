import { status } from '@grpc/grpc-js';
import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  private readonly logger = new Logger(UserService.name);

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return { users: `This action  all user` };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByUsername(username) {
    const res = await this.userRepository.findByUsername(username);

    if (!res.records.length) {
      this.logger.warn('User not found, throwing exception');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${username} not found`,
      });
    }

    const user = new User(res.records[0].get('u'));
    return user.toJson();
  }
}
