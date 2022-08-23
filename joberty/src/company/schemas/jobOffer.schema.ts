import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
export class JobOffer extends Document {
  @Prop()
  position: string;

  @Prop()
  seniority: string;

  @Prop()
  description: string;

  @Prop([String])
  skillsRequired: string[];
}

export const JobOfferSchema = SchemaFactory.createForClass(JobOffer);
