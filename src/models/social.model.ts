import { model, models } from 'mongoose';
import { Document, Schema } from 'mongoose';
import { UserDoc } from './user.model';

export interface SocialDoc extends Document {
  name: 'Github' | 'LinkedIn' | 'Website' | 'Twitter';
  url: string;
  clerkUserId: UserDoc['clerkUserId'];
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
  clerkUserId: {
    type: String,
    ref: 'User',
    required: true,
  },
});

const SocialsModel =
  models.Socials || model<SocialDoc>('Socials', socialSchema);

export default SocialsModel;
