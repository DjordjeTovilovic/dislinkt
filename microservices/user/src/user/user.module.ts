import { Module, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Neo4jService } from 'nest-neo4j/dist';
import { UserRepository } from './user.repository';
import { BlockFollowRepository } from './blockFollow.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DeleteUserSaga } from './user.delete.saga';
import { UserMessageController } from './user.message.controller';

const host = process.env.RABBITMQ_HOST || 'localhost';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${host}:5672`],
          queue: 'post_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${host}:5672`],
          queue: 'user_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UserController, UserMessageController, DeleteUserSaga],
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
