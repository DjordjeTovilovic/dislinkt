import {
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Request,
  Sse,
} from '@nestjs/common';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { EventsService } from './events.service';

@Controller()
export class AppController {
  constructor(private readonly eventsService: EventsService) {}
  private readonly logger = new Logger(AppController.name);

  @Sse('messenger/:userId')
  events(@Param('userId') userId: string) {
    return this.eventsService.subscribe(userId);
  }

  @EventPattern('message_sent')
  async handlePostLiked(payload) {
    this.logger.log('handle_message_sent#event#payload', payload);
    this.eventsService.emit(payload);
    return { ok: true };
  }
}
