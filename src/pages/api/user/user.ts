import { connectDB } from '@/lib/utils/connect';
import UserModel, { UserDoc } from '@/models/user.model';
import { clerkClient, getAuth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';

//this signs in the user if not signed in and returns the user object
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { userId } = getAuth(req);
    const user = userId ? await clerkClient.users.getUser(userId) : null;
    if (!user) return res.status(401).send('You are unauthorized');
    try {
      await connectDB();
      const existingUser: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!existingUser) {
        const createdUser: UserDoc | null = await UserModel.create({
          clerkUserId: userId,
        });
        return res.status(201).send(createdUser);
      } else {
        res.status(200).send(existingUser);
      }
    } catch (err: any) {
      console.error(err);
      res.status(500).send('Intl. server err ');
    }
  }
}
