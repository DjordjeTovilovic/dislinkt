import { Injectable, Logger } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
  constructor(private readonly messagingRepository: NotificationRepository) {}
  private readonly logger = new Logger(NotificationService.name);

  async newNotification(notification) {
    this.messagingRepository.newNotification(notification);
  }

  async findAll(username) {
    const notifications = await this.messagingRepository.findAll(username);
    const notificationsDto = notifications.map(
      (notification) =>
        new NotificationDto(
          notification.id,
          notification.postId,
          notification.type,
          notification.senderUsername,
          notification.receiverUsername,
          notification.createdAt,
        ),
    );
    return { notifications: notificationsDto };
  }
}
