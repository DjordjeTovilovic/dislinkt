import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserRestController } from './user.rest.controller';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RpcExceptionInterceptor } from './pipes/RpcExceptionInterceptor';
import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from './protos/user.pb';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from './protos/auth.pb';
import { AuthRestController } from './auth.rest.controller';
import { PassportModule } from '@nestjs/passport';
import { PostRestController } from './post.rest.controller';
import { POST_PACKAGE_NAME, POST_SERVICE_NAME } from './protos/post.pb';
import { JOB_PACKAGE_NAME, JOB_SERVICE_NAME } from './protos/job.pb';
import { JobRestController } from './job.rest.controller';
import {
  MESSAGING_PACKAGE_NAME,
  MESSAGING_SERVICE_NAME,
} from './protos/messaging.pb';
import { MessagingRestController } from './messaging.rest.controller';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: `${process.env.USER_SERVICE_URL}:${process.env.USER_SERVICE_PORT}`,
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, './protos/user.proto'),
        },
      },
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: `${process.env.AUTH_SERVICE_URL}:${process.env.AUTH_SERVICE_PORT}`,
          // url: '0.0.0.0:50052',
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, './protos/auth.proto'),
        },
      },
      {
        name: POST_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: `${process.env.POST_SERVICE_URL}:${process.env.POST_SERVICE_PORT}`,
          // url: '0.0.0.0:50053',
          package: POST_PACKAGE_NAME,
          protoPath: join(__dirname, './protos/post.proto'),
        },
      },
      {
        name: JOB_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: `${process.env.JOB_SERVICE_URL}:${process.env.JOB_SERVICE_PORT}`,
          // url: '0.0.0.0:50054',
          package: JOB_PACKAGE_NAME,
          protoPath: join(__dirname, './protos/job.proto'),
        },
      },
      {
        name: MESSAGING_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: `${process.env.MESSAGING_SERVICE_URL}:${process.env.MESSAGING_SERVICE_PORT}`,
          // url: '0.0.0.0:50055',
          package: MESSAGING_PACKAGE_NAME,
          protoPath: join(__dirname, './protos/messaging.proto'),
        },
      },
    ]),
  ],
  controllers: [
    UserRestController,
    AuthRestController,
    PostRestController,
    JobRestController,
    MessagingRestController,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExceptionInterceptor,
    },
  ],
})
export class AppModule {}
