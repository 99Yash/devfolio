import { connectDB } from '@/lib/utils/connect';
import UserModel, { UserDoc } from '@/models/user.model';
import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    try {
      const { userId } = getAuth(req);
      if (!userId) return res.status(401).send('You are unauthorized');
      await connectDB();
      const userToUpdate: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!userToUpdate) return res.status(404).send("User doesn't exist");
      const { about } = req.body;
      userToUpdate.about = about;
      const returnedUser = await userToUpdate.save();
      if (!returnedUser) return res.status(500).send('Error saving user.');
      return res.status(200).send('About updated');
    } catch (err: any) {
      console.error(err);
    }
  } else if (req.method === 'GET') {
    try {
      const { userId } = getAuth(req);
      if (!userId) return res.status(401).send('You are unauthorized');
      await connectDB();
      const user: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!user) return res.status(404).send("User doesn't exist");
      return res.status(200).send({
        about: user.about,
      });
    } catch (err: any) {
      console.error(err);
    }
  }
}
