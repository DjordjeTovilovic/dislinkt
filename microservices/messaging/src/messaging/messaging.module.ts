import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagingService } from './messaging.service';
import { MessagingController } from './messaging.controller';
import { Message, MessageSchema } from './schemas/message.scheme';
import { MessagingRepository } from './messaging.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

const host = process.env.RABBITMQ_HOST || 'localhost';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ClientsModule.register([
      {
        name: 'MESSAGING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${host}:5672`],
          queue: 'messaging_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [MessagingController],
  providers: [MessagingService, MessagingRepository],
})
export class MessagingModule {}
