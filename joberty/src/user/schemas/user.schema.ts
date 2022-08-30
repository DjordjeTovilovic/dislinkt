import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company } from 'src/company/schemas/company.scheme';
import { Role } from 'src/enums/role';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { expand } from 'rxjs';

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
export class User extends Document {
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

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Company' })
  companiesOwned: Company;

  @Prop()
  dislinktToken: string;

  @Prop({ default: Role.User })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
