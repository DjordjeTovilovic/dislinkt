import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from './schemas/notification.scheme';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  newNotification(notification) {
    const createdNotification = new this.notificationModel(notification);
    return createdNotification.save();
  }

  findAll(username) {
    return this.notificationModel
      .find({
        receiverUsername: username,
      })
      .sort({ createdAt: 1 });
  }
}
