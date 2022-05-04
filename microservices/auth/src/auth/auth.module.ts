import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from '../protos/user.pb';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRES_IN')}`,
        },
      }),
    }),
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          // url: '0.0.0.0:50051',
          url: `${process.env.USER_SERVICE_URL}:${process.env.USER_SERVICE_PORT}`,
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, '../protos/user.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
