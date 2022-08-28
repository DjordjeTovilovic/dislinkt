import { Module } from '@nestjs/common';
import { MessagingModule } from './messaging/messaging.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { EventsService } from './events.service';

const url = process.env.MONGO_URL || 'localhost';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MessagingModule,
    process.env.MONGO_URL
      ? MongooseModule.forRoot(
          `mongodb://${url}:27017/messaging?authSource=admin`,
          {
            useNewUrlParser: true,
            user: 'admin',
            pass: 'admin',
            keepAlive: true,
          },
        )
      : MongooseModule.forRoot(process.env.MONGODB_ATLAS_URI),
  ],
  controllers: [AppController],
  providers: [EventsService],
})
export class AppModule {}
