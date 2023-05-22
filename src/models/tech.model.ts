import { Document } from 'mongodb';
import { Model, Schema, model, models } from 'mongoose';
import { UserDoc } from './user.model';

export interface TechDoc extends Document {
  name: string;
  clerkUserId: UserDoc['clerkUserId'];
}

export const techSchema = new Schema<TechDoc>({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
});

const TechModel: Model<TechDoc> =
  models.Tech || model<TechDoc>('Tech', techSchema);

export default TechModel;
