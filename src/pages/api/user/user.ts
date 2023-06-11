import { connectDB } from '@/lib/utils/connect';
import UserModel, { UserDoc } from '@/models/user.model';
import { clerkClient } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).send('No you are unauthorized');
    if (userId) {
      const user = await clerkClient.users.getUser(userId);
    }
    try {
      // Create or retrieve the user
      await connectDB();

      const existingUser: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });

      if (!existingUser) {
        const user = await clerkClient.users.getUser(userId);
        const createdUser: UserDoc | null = await UserModel.create({
          clerkUserId: userId,
          fullName: `${user?.firstName} ${user?.lastName}`,
        });
        return res.status(201).send(createdUser);
      } else {
        return res.status(200).send(existingUser);
      }
    } catch (err: any) {
      console.error(err);
      return res.status(500).send('Intl. server error');
    }
  } else if (req.method === 'PATCH') {
    const { userId } = getAuth(req);
    try {
      // Create or retrieve the user
      await connectDB();
      const existingUser: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!existingUser) {
        return res.status(404).send("User doesn't exist");
      } else {
        const { fullName, oneLiner } = req.body;
        existingUser.fullName = fullName;
        existingUser.oneLiner = oneLiner;
        const updatedUser = await existingUser.save();
        return res.status(200).send(updatedUser);
      }
    } catch (err: any) {
      console.error(err);
      return res.status(500).send('Intl. server error');
    }
  }
}
