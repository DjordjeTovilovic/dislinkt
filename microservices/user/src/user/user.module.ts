import { Module, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Neo4jService } from 'nest-neo4j/dist';
import { UserRepository } from './user.repository';
import { BlockFollowRepository } from './blockFollow.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, BlockFollowRepository],
})
export class UserModule implements OnModuleInit {
  constructor(private readonly neo4jService: Neo4jService) {}

  async onModuleInit() {
    await this.neo4jService
      .write(`CREATE CONSTRAINT ON (u:User) ASSERT u.id IS UNIQUE`)
      .catch(() => {});
    await this.neo4jService
      .write(`CREATE CONSTRAINT ON (u:User) ASSERT u.username IS UNIQUE`)
      .catch(() => {});
    await this.neo4jService
      .write(`CREATE CONSTRAINT ON (u:User) ASSERT u.email IS UNIQUE`)
      .catch(() => {});
  }
}
