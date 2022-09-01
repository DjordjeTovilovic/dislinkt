import { Metadata } from '@grpc/grpc-js';
import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { AuthGuard } from './auth.guard';
import {
  NotificationServiceClient,
  NOTIFICATION_SERVICE_NAME,
} from './protos/notification.pb';

@Controller('notifications')
export class NotificationRestController implements OnModuleInit {
  private readonly logger = new Logger(NotificationRestController.name);

  private notificationService: NotificationServiceClient;

  constructor(
    @Inject(NOTIFICATION_SERVICE_NAME) private notificationClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.notificationService =
      this.notificationClient.getService<NotificationServiceClient>(
        NOTIFICATION_SERVICE_NAME,
      );
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req) {
    this.logger.log('findAll.call#username ', req.user.username);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const notifications = await lastValueFrom(
      this.notificationService.findAll({}, metadata).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );

    this.logger.log('findAll.call#return notifications');
    return notifications;
  }
}
