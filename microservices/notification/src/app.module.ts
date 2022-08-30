import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { EventsService } from './events.service';
import { NotificationModule } from './notification/notification.module';

const url = process.env.MONGO_URL || 'localhost';

@Module({
  controllers: [AppController],
  providers: [EventsService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NotificationModule,
    process.env.MONGO_URL
      ? MongooseModule.forRoot(
          `mongodb://${url}:27017/notification?authSource=admin`,
          {
            useNewUrlParser: true,
            user: 'admin',
            pass: 'admin',
            keepAlive: true,
          },
        )
      : MongooseModule.forRoot(process.env.MONGODB_ATLAS_URI),
  ],
})
export class AppModule {}
