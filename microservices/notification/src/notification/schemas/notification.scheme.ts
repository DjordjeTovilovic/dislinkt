import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NotificationDto } from '../dto/notification.dto';

export type NotificationDocument = Notification & Document;

@Schema({
  timestamps: true,
  toObject: {
    transform: function (doc: any, ret: any): NotificationDto {
      return new NotificationDto(
        ret._id,
        ret.postId,
        ret.type,
        ret.senderUsername,
        ret.receiverUsername,
        ret.createdAt,
      );
    },
  },
  toJSON: {
    transform: function (doc: any, ret: any): NotificationDto {
      return new NotificationDto(
        ret._id,
        ret.postId,
        ret.type,
        ret.senderUsername,
        ret.receiverUsername,
        ret.createdAt,
      );
    },
  },
})
export class Notification {
  @Prop()
  postId: string;

  @Prop()
  type: string;

  @Prop()
  senderUsername: string;

  @Prop()
  receiverUsername: string;

  @Prop()
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
