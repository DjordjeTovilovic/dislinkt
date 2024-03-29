import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Company } from 'src/company/schemas/company.scheme';
import { User } from 'src/user/schemas/user.schema';

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
  user: User;

  @Prop()
  company: Company;
}

export const CreateRequestSchema = SchemaFactory.createForClass(CreateRequest);
