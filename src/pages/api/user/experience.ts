import { connectDB } from '@/lib/utils/connect';
import ExperienceModel from '@/models/experience.model';
import UserModel, { UserDoc } from '@/models/user.model';
import { getAuth } from '@clerk/nextjs/server';
import { Types } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const route = new URL(req.headers.referer!).pathname;
    //? check for auth if req is coming from home page, not the /portfolio/<userId> (public) page
    let userId = '';
    if (route === '/') {
      const auth = getAuth(req);
      if (!auth.userId) return res.status(401).send('No you are unauthorized');
      userId = auth.userId;
    } else {
      const regex = /\/portfolio\/(.*)/;
      const match = route.match(regex);
      const clerkUserId = match ? match[1] : null;
      if (!clerkUserId) return res.status(404).send('Not found user');
      const clerkIdStr = clerkUserId as string;
      userId = clerkIdStr;
    }
    try {
      await connectDB();
      const user: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!user) return res.status(404).send("User doesn't exist");
      const userExpList = await ExperienceModel.find({
        clerkUserId: userId,
      });
      return res.status(200).send({
        experiences: userExpList,
      });
    } catch (err: any) {
      console.error(err);
    }
  }
  if (req.method === 'POST') {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).send('You are unauthorized');
    try {
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
        endDate:
          experience.endDate === 'present' ? new Date() : experience.endDate,
        present: experience.present,
        clerkUserId: userId,
      });
      return res.status(201).send(addedExp);
    } catch (err: any) {
      console.error(err);
    }
  }
  if (req.method === 'PUT') {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).send('You are unauthorized');
    try {
      await connectDB();
      const expUser: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!expUser) return res.status(404).send("User doesn't exist");
      const { experience } = req.body;
      const expId = new Types.ObjectId(experience._id);
      const expToUpdate = await ExperienceModel.findById(expId);
      if (!expToUpdate) return res.status(404).send("Experience doesn't exist");
      expToUpdate.position = experience.position;
      expToUpdate.companyName = experience.companyName;
      expToUpdate.description = experience.description;
      expToUpdate.startDate = experience.startDate;
      expToUpdate.endDate =
        experience.endDate === null ? new Date() : experience.endDate;
      expToUpdate.present = experience.present;
      const returnedExp = await expToUpdate.save();
      if (!returnedExp) return res.status(500).send('Error saving experience.');
      return res.status(200).send(returnedExp);
    } catch (err: any) {
      console.error(err);
    }
  }
}
