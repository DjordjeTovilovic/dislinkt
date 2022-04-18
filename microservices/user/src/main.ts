import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        // url: 'http://localhost:6379',
        // url: '0.0.0.0:50052',
        package: 'user',
        protoPath: join(__dirname, '../../../protos/user.proto'),
      },
    },
  );
  await app.listen();
}

bootstrap();
