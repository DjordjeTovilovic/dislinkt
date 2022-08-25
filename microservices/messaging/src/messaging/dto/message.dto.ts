import { Message } from '../../protos/messaging.pb';

export class MessageDto implements Message {
  text: string;
  senderId: string;
  receiverId: string;
  createdAt: string;

  constructor(
    text: string,
    senderId: string,
    receiverId: string,
    createdAt: Date,
  ) {
    this.text = text;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.createdAt = createdAt.toISOString();
  }
}
