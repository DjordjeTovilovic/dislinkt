import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MessageDto } from '../dto/message.dto';

export type MessageDocument = Message & Document;

@Schema({
  timestamps: true,
  toObject: {
    transform: function (doc: any, ret: any): MessageDto {
      return new MessageDto(
        ret.text,
        ret.senderId,
        ret.receiverId,
        ret.createdAt,
      );
    },
  },
  toJSON: {
    transform: function (doc: any, ret: any): MessageDto {
      return new MessageDto(
        ret.text,
        ret.senderId,
        ret.receiverId,
        ret.createdAt,
      );
    },
  },
})
export class Message {
  @Prop()
  text: string;

  @Prop()
  senderId: string;

  @Prop()
  receiverId: string;

  @Prop()
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
