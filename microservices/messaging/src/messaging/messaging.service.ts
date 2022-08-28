import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessageDto } from './dto/message.dto';
import { UsersDto } from './dto/users.dto';
import { MessagingRepository } from './messaging.repository';

@Injectable()
export class MessagingService {
  constructor(
    private readonly messagingRepository: MessagingRepository,
    @Inject('MESSAGING_SERVICE') private messagingClient: ClientProxy,
  ) {}
  private readonly logger = new Logger(MessagingService.name);

  async sendMessage(messageDto: MessageDto) {
    const message = await this.messagingRepository.sendMessage(messageDto);
    this.logger.log('message_sent#emit');
    this.messagingClient.emit('message_sent', message);
  }

  async findAll(users: UsersDto): Promise<{ messages: MessageDto[] }> {
    const messages = await this.messagingRepository.findAll(users);
    const messagesDto = messages.map(
      (message) =>
        new MessageDto(
          message.text,
          message.senderId,
          message.receiverId,
          message.createdAt,
        ),
    );
    return { messages: messagesDto };
  }
}
