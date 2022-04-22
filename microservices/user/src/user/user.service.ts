import { status } from '@grpc/grpc-js';
import { Injectable, Logger, UseFilters } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly neo4jService: Neo4jService) {}
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
    const res = await this.neo4jService.read(
      `
            MATCH (u:User {username: $username})
            RETURN u
        `,
      {
        username,
      },
    );

    if (!res.records.length) {
      this.logger.warn('User not found, throwing exception');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User not found',
      });
    }

    const user = new User(res.records[0].get('u'));
    return user.toJson();
  }
}
