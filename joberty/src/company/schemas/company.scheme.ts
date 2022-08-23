import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { JobOffer, JobOfferSchema } from './jobOffer.schema';

export type CompanyDocument = Company & Document;

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
export class Company extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [JobOfferSchema], default: [] })
  jobOffers: JobOffer[];

  @Prop({
    type: [
      {
        position: { type: String },
        seniority: { type: String },
        review: { type: String },
      },
    ],
    _id: false,
  })
  reviews: { position: string; seniority: string; review: string }[];

  @Prop({
    type: [
      {
        position: { type: String },
        seniority: { type: String },
        salary: { type: Number },
      },
    ],
    _id: false,
  })
  salaries: { position: string; seniority: string; salary: number }[];

  @Prop({
    type: [
      {
        position: { type: String },
        seniority: { type: String },
        interview: { type: String },
      },
    ],
    _id: false,
  })
  interviews: { position: string; seniority: string; interview: string }[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
