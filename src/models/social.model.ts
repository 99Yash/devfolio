import { model, models } from 'mongoose';
import { Document, Schema } from 'mongoose';

export interface SocialDoc extends Document {
  name: 'Github' | 'LinkedIn' | 'Website' | 'Twitter';
  url: string;
}

export const socialSchema = new Schema({
  name: {
    type: String,
    enum: ['Github', 'LinkedIn', 'Website', 'Twitter'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const SocialsModel =
  models.Socials || model<SocialDoc>('Socials', socialSchema);

export default SocialsModel;
