import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { NOTIFICATION_PACKAGE_NAME } from './protos/notification.pb';

const host = process.env.RABBITMQ_HOST || 'localhost';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `${process.env.URL}:${process.env.PORT}`,
      package: NOTIFICATION_PACKAGE_NAME,
      protoPath: join(__dirname, './protos/notification.proto'),
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://guest:guest@${host}:5672`],
      queue: 'notification_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
