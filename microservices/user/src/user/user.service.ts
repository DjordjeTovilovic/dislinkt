import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly neo4jService: Neo4jService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return { users: `This action returns all user` };
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

  async findByUsername(username): Promise<UserDto | undefined> {
    const res = await this.neo4jService.read(
      `
            MATCH (u:User {username: $username})
            RETURN u
        `,
      {
        username,
      },
    );

    if (res.records.length == 0) return undefined;

    const user = new User(res.records[0].get('u'));
    return user.toJson();
  }
}
