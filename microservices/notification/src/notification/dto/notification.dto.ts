import { Notification } from '../../protos/notification.pb';

export class NotificationDto implements Notification {
  id: string;
  postId: string;
  type: string;
  senderUsername: string;
  receiverUsername: string;
  createdAt: string;

  constructor(
    id: string,
    postId: string,
    type: string,
    senderUsername: string,
    receiverUsername: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.postId = postId;
    this.type = type;
    this.senderUsername = senderUsername;
    this.receiverUsername = receiverUsername;
    this.createdAt = createdAt.toISOString();
  }
}
