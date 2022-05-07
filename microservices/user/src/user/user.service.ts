import { status } from '@grpc/grpc-js';
import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UserServiceController } from '../protos/user.pb';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  private readonly logger = new Logger(UserService.name);

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return user;
  }

  async findByUsername(username) {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      this.logger.warn('User not found, throwing exception');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${username} not found`,
      });
    }

    return user;
  }

  findAll() {
    return { users: `This action  all user` };
  }
}
