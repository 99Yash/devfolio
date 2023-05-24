import { connectDB } from '@/lib/utils/connect';
import ExperienceModel from '@/models/experience.model';
import UserModel, { UserDoc } from '@/models/user.model';
import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { userId } = getAuth(req);
      if (!userId) return res.status(401).send('You are unauthorized');
      await connectDB();
      const user: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!user) return res.status(404).send("User doesn't exist");
      return res.status(200).send({
        experiences: user.experiences,
      });
    } catch (err: any) {
      console.error(err);
    }
  }
  if (req.method === 'POST') {
    try {
      const { userId } = getAuth(req);
      if (!userId) return res.status(401).send('You are unauthorized');
      await connectDB();
      const user: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!user) return res.status(404).send("User doesn't exist");
      const { experience } = req.body;
      const addedExp = await ExperienceModel.create({
        ...experience,
        startMonth: experience.startDate.month,
        startYear: experience.startDate.year,
        endMonth: experience.endDate.month,
        endYear: experience.endDate.year,
        clerkUserId: userId,
      });
      if (!user.experiences) {
        user.experiences = [];
      }
      user.experiences?.push(addedExp._id);
      await user.save();
      return res.status(200).send({
        experiences: user.experiences,
      });
    } catch (err: any) {
      console.error(err);
    }
  }
}
