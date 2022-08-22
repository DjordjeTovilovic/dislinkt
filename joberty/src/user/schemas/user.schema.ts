import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

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
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  role: string;

  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop([String])
  companiesOwned: string[];

  @Prop()
  dislinktToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
