import { Controller, Get, Inject, Logger, Sse } from '@nestjs/common';
import { AppService } from './app.service';
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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('sse')
  sse() {
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }

  @EventPattern('post_liked')
  async handlePostLiked(payload) {
    this.logger.log('Notification.handlePostLiked.event#payload');
  }
}
