import { Module } from '@nestjs/common';
import { MessagingModule } from './messaging/messaging.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MessagingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
