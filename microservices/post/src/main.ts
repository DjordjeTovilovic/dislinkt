import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { POST_PACKAGE_NAME } from './protos/post.pb';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${process.env.URL}:${process.env.PORT}`,
        package: POST_PACKAGE_NAME,
        protoPath: join(__dirname, './protos/post.proto'),
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen();
}

bootstrap();
