import { Document, Schema, model, models } from 'mongoose';

export interface UserDoc extends Document {
  fullName?: string;
  clerkUserId: string;
  oneLiner?: string;
  about?: string;
}

const userSchema = new Schema<UserDoc>({
  fullName: {
    type: String,
    default: '',
  },
  clerkUserId: {
    type: String,
    required: true,
  },
  oneLiner: {
    type: String,
    default: '',
  },
  about: {
    type: String,
    default: '',
  },
});

const UserModel = models.User || model<UserDoc>('User', userSchema);

export default UserModel;
