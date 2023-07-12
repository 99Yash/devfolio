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
      // Create or retrieve the user
      await connectDB();

      const existingUser: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });

      const clerkUserImage = (await clerkClient.users.getUser(userId))
        .profileImageUrl;
      if (!existingUser) {
        const user = await clerkClient.users.getUser(userId);
        const createdUser: UserDoc | null = await UserModel.create({
          clerkUserId: userId,
          fullName: `${user?.firstName} ${user?.lastName}`,
        });
        return res.status(201).send({
          user: createdUser,
          clerkUserImage,
        });
      } else {
        return res.status(200).send({
          user: existingUser,
          clerkUserImage,
        });
      }
    } catch (err: any) {
      console.error(err);
      return res.status(500).send('Intl. server error');
    }
  } else if (req.method === 'PUT') {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).send('No you are unauthorized');
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
