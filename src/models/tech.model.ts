import { Document } from 'mongodb';
import { Model, Schema, model, models } from 'mongoose';

export interface TechDoc extends Document {
  name: string;
}

export const techSchema = new Schema<TechDoc>({
  name: {
    type: String,
    required: true,
  },
});

const TechModel: Model<TechDoc> =
  models.Tech || model<TechDoc>('Tech', techSchema);

export default TechModel;
