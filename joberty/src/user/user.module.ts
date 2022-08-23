import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/role';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [UserService],
})
export class UserModule {}
