import { Controller } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessageDto } from './dto/message.dto';
import {
  MessagingServiceController,
  MessagingServiceControllerMethods,
} from '../protos/messaging.pb';
import { UsersDto } from './dto/users.dto';

@Controller()
@MessagingServiceControllerMethods()
export class MessagingController implements MessagingServiceController {
  constructor(private readonly messagingService: MessagingService) {}

  sendMessage(messageDto: MessageDto) {
    return this.messagingService.sendMessage(messageDto);
  }

  findAll(users: UsersDto) {
    return this.messagingService.findAll(users);
  }
}
