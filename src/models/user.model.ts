import { Document, Schema, model, models } from 'mongoose';
import { ExperienceDoc } from './experience.model';
import { ProjectDoc } from './project.model';
import { SocialDoc } from './social.model';
import { TechDoc } from './tech.model';

export interface UserDoc extends Document {
  fullName?: string;
  clerkUserId: string;
  oneLiner?: string;
  socials?: Array<SocialDoc['_id']>;
  about?: string;
  experiences?: Array<ExperienceDoc['_id']>;
  techStack?: Array<TechDoc['_id']>;
  projects?: Array<ProjectDoc['_id']>;
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
  socials: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Socials' }],
    default: [],
  },
  about: {
    type: String,
    default: '',
  },
  techStack: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Tech' }],
    default: [],
  },
  experiences: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Experience' }],
    default: [],
  },
  projects: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    default: [],
  },
});

const UserModel = models.User || model<UserDoc>('User', userSchema);

export default UserModel;
