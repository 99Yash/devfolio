import { connectDB } from '@/lib/utils/connect';
import UserModel, { UserDoc } from '@/models/user.model';
import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';

//this signs in the user if not signed in and returns the user object
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    const { userId, user } = getAuth(req);
    if (!userId) return res.status(401).send('You are unauthorized');
    try {
      await connectDB();
      const userToCreate: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!userToCreate) {
        const createdUser: UserDoc | null = await UserModel.create({
          clerkUserId: userId,
        });
        console.log(createdUser);
        return res.status(200).send({ user: createdUser });
      } else {
        res.status(200).send({ user: userToCreate });
      }
    } catch (err: any) {
      console.error(err);
    }
  }
}