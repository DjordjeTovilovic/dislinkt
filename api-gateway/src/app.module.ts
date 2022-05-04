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
    ]),
  ],
  controllers: [UserRestController, AuthRestController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExceptionInterceptor,
    },
  ],
})
export class AppModule {}
