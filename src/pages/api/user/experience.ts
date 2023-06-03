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
      const userExpList = await ExperienceModel.find({
        clerkUserId: userId,
      });
      return res.status(200).setHeader('Cache-Control', 'no-cache').send({
        experiences: userExpList,
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
        position: experience.position,
        companyName: experience.companyName,
        description: experience.description,
        startDate: experience.startDate,
        endDate: experience.endDate,
        present: experience.present,
        clerkUserId: userId,
      });
      if (!user.experiences) {
        user.experiences = [];
      }
      user.experiences?.push(addedExp);
      await user.save();
      return res.status(201).send(addedExp);
    } catch (err: any) {
      console.error(err);
    }
  }
}
