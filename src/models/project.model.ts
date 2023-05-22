import { Document, Model, Schema, model, models } from 'mongoose';
import { UserDoc } from './user.model';

export interface ProjectDoc extends Document {
  title: string;
  description?: string;
  techStack: string[];
  githubLink: string;
  demoLink?: string;
  clerkUserId: UserDoc['clerkUserId'];
}

export const projectSchema = new Schema<ProjectDoc>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  techStack: {
    type: [String],
  },
  githubLink: {
    type: String,
    required: true,
  },
  demoLink: {
    type: String,
  },
  clerkUserId: {
    type: String,
    ref: 'User',
    required: true,
  },
});

const ProjectModel: Model<ProjectDoc> =
  models.Project || model<ProjectDoc>('Project', projectSchema);

export default ProjectModel;
