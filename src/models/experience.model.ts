import { Document, Schema, model, models } from 'mongoose';
import { UserDoc } from './user.model';

export interface ExperienceDoc extends Document {
  position: string;
  companyName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  present: boolean;
  clerkUserId: UserDoc['clerkUserId'];
}

export const experienceSchema = new Schema<ExperienceDoc>({
  position: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  present: {
    type: Boolean,
    required: true,
  },
  clerkUserId: {
    type: String,
    ref: 'User',
    required: true,
  },
});
const ExperienceModel =
  models.Experience || model<ExperienceDoc>('Experience', experienceSchema);

export default ExperienceModel;
