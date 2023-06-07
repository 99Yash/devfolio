import { connectDB } from '@/lib/utils/connect';
import ExperienceModel from '@/models/experience.model';
import ProjectModel from '@/models/project.model';
import UserModel, { UserDoc } from '@/models/user.model';
import { getAuth } from '@clerk/nextjs/server';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).send('You are unauthorized');
    try {
      await connectDB();
      const experienceUser: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!experienceUser) return res.status(404).send("User doesn't exist");
      const { experienceId } = req.query;
      const expIdStr = experienceId as string;
      const expId = new mongoose.Types.ObjectId(expIdStr);
      await ExperienceModel.findByIdAndDelete(expId);
      await UserModel.findByIdAndUpdate(experienceUser._id, {
        $pull: {
          experiences: expId,
        },
      });
      return res.status(200).send('Project deleted');
    } catch (err: any) {
      console.error(err);
    }
  }
}
