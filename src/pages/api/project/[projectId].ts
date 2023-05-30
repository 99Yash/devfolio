import { connectDB } from '@/lib/utils/connect';
import ProjectModel from '@/models/project.model';
import UserModel, { UserDoc } from '@/models/user.model';
import { getAuth } from '@clerk/nextjs/server';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

//?to get the details of a single project(for the edit modal)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).send('You are unauthorized');
    try {
      await connectDB();
      const projectUser: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!projectUser) return res.status(404).send("User doesn't exist");
      const { projectId } = req.query;
      const projIdStr = projectId as string;
      const projId = new mongoose.Types.ObjectId(projIdStr);
      await ProjectModel.findByIdAndDelete(projId);
      await UserModel.findByIdAndUpdate(projectUser._id, {
        $pull: {
          projects: projId,
        },
      });
      return res.status(200).send('Project deleted');
    } catch (err: any) {
      console.error(err);
    }
  }
}
