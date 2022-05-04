import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class UserRepository {
  constructor(private readonly neo4jService: Neo4jService) {}

  async findByUsername(username) {
    return await this.neo4jService.read(
      `
          MATCH (u:User {username: $username})
          RETURN u
      `,
      {
        username,
      },
    );
  }
}
