import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserMessageController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserMessageController.name);

  @MessagePattern({ cmd: 'restore_deleted_user' })
  async restoreDeleteById(@Payload() payload) {
    return this.userService.restoreDeleteById(payload.userId);
  }
}
