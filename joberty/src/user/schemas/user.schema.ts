import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
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
