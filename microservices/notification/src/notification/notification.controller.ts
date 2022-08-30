import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  Empty,
  NotificationServiceController,
  NotificationServiceControllerMethods,
} from '../protos/notification.pb';
import { Metadata } from '@grpc/grpc-js';

@NotificationServiceControllerMethods()
@Controller()
export class NotificationController implements NotificationServiceController {
  constructor(private readonly notificationService: NotificationService) {}

  findAll(empty: Empty, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return this.notificationService.findAll(username);
  }
}
