import { Module, OnModuleInit } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Neo4jService } from 'nest-neo4j/dist';
import { PostRepository } from './post.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostMessageController } from './post.message.controller';

const host = process.env.RABBITMQ_HOST || 'localhost';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${host}:5672`],
          queue: 'notification_queue',
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
  controllers: [PostController, PostMessageController],
  providers: [PostService, PostRepository],
})
export class PostModule implements OnModuleInit {
  constructor(private readonly neo4jService: Neo4jService) {}

  async onModuleInit() {
    await this.neo4jService
      .write('CREATE CONSTRAINT ON (p:Post) ASSERT p.id IS UNIQUE')
      .catch(() => {});
  }
}
