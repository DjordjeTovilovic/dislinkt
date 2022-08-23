import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { UsersDto } from './dto/users.dto';
import { MessagingRepository } from './messaging.repository';

@Injectable()
export class MessagingService {
  constructor(private readonly messagingRepository: MessagingRepository) {}

  async sendMessage(messageDto: MessageDto) {
    const a = await this.messagingRepository.sendMessage(messageDto);
    console.log(a);
  }

  async findAll(users: UsersDto): Promise<{ messages: MessageDto[] }> {
    const messages = await this.messagingRepository.findAll(users);
    const messagesDto = messages.map(
      (message) =>
        new MessageDto(
          message.message,
          message.senderId,
          message.receiverId,
          message.createdAt,
        ),
    );
    return { messages: messagesDto };
  }
}
