import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly neo4jService: Neo4jService) {}

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

    if (!res.records.length) return null;

    const row = res.records[0];
    return new User(row.get('u')).toJson();
  }

  async create(user: CreateUserDto) {
    const res = await this.neo4jService.write(
      `
        CREATE (u:User {
            id: randomUUID(),
            username: $username,
            password: $password,
            email: $email,
            bio: $bio,
            image: $image
        })
        RETURN u
      `,
      {
        username: user.username,
        password: user.password,
        email: user.email,
        bio: user.bio,
        image: user.image,
      },
    );

    if (!res.records.length) return null;

    const row = res.records[0];
    return new User(row.get('u')).toJson();
  }
}
