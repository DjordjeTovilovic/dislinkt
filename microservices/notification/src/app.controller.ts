import { Controller, Logger, Param, Sse } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EventsService } from './events.service';
import { NotificationService } from './notification/notification.service';

@Controller()
export class AppController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly notificationService: NotificationService,
  ) {}
  private readonly logger = new Logger(AppController.name);

  @Sse('notifications/sse/:username')
  events(@Param('username') username: string) {
    return this.eventsService.subscribe(username);
  }

  @EventPattern('post_liked')
  async handlePostLiked(payload) {
    this.logger.log('handle_post_liked#event#payload', payload);
    this.handleNewNotification(payload);
  }

  @EventPattern('post_disliked')
  async handlePostDisliked(payload) {
    this.logger.log('handle_post_disliked#event#payload');
    this.handleNewNotification(payload);
  }

  @EventPattern('post_commented')
  async handlePostCommented(payload) {
    this.logger.log('handle_post_commented#event#payload');
    this.handleNewNotification(payload);
  }

  async handleNewNotification(payload) {
    this.notificationService.newNotification(payload);
    this.eventsService.emit(payload);
    // return { ok: true };
  }
}
