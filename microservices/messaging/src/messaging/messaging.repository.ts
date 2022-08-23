import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDto } from './dto/message.dto';
import { UsersDto } from './dto/users.dto';
import { Message, MessageDocument } from './schemas/message.scheme';

@Injectable()
export class MessagingRepository {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  sendMessage(messageDto: MessageDto) {
    const createdMessage = new this.messageModel(messageDto);
    return createdMessage.save();
  }

  findAll(users: UsersDto) {
    return this.messageModel
      .find()
      .or([
        {
          senderId: users.user1Id,
          receiverId: users.user2Id,
        },
        {
          senderId: users.user2Id,
          receiverId: users.user1Id,
        },
      ])
      .sort({ createdAt: 1 });
  }
}
