import { Document, Schema, model, models } from 'mongoose';
import { UserDoc } from './user.model';

export interface ExperienceDoc extends Document {
  position: string;
  companyName: string;
  description: string;
  startYear: number;
  startMonth: number;
  endMonth?: number;
  endYear?: number;
  present?: boolean;
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
  startMonth: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  startYear: {
    type: Number,
    required: true,
  },
  endMonth: {
    type: Number,
    min: 1,
    max: 12,
    required: true,
  },
  endYear: {
    type: Number,
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
