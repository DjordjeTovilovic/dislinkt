import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { RequestModule } from './requests/request.module';

const url = process.env.MONGO_URL || 'localhost';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    CompanyModule,
    RequestModule,
    process.env.MONGO_URL
      ? MongooseModule.forRoot(
          `mongodb://${url}:27017/joberty?authSource=admin`,
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
  providers: [AppService],
})
export class AppModule {}
