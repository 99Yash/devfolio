import { Schema } from 'mongoose';
import { Document, model, models } from 'mongoose';
import { UserDoc } from './user.model';

export interface TechDoc extends Document {
  name: string;
  clerkUserId: UserDoc['clerkUserId'];
}

export const techSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  clerkUserId: {
    type: String,
    ref: 'User',
    required: true,
  },
});

const TechModel = models.Tech || model<TechDoc>('Tech', techSchema);

export default TechModel;
