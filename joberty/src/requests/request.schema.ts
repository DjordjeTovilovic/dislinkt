import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CreateRequestDocument = CreateRequest & Document;

@Schema({
  toObject: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
  toJSON: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class CreateRequest extends Document {
  @Prop()
  userId: string;

  @Prop()
  companyId: string;
}

export const CreateRequestSchema = SchemaFactory.createForClass(CreateRequest);
