import { Document, Schema, model, models } from 'mongoose';
import { UserDoc } from './user.model';

export interface ExperienceDoc extends Document {
  position: string;
  companyName: string;
  description: string;
  startYear: string;
  startMonth: string;
  endMonth?: string;
  endYear?: string;
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
    type: String,
    required: true,
  },
  startYear: {
    type: String,
    required: true,
  },
  endMonth: {
    type: String,
    required: true,
  },
  endYear: {
    type: String,
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
