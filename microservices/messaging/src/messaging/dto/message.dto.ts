import { Message } from '../../protos/messaging.pb';

export class MessageDto implements Message {
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: string;

  constructor(
    message: string,
    senderId: string,
    receiverId: string,
    createdAt: Date,
  ) {
    this.message = message;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.createdAt = createdAt.toISOString();
  }
}
