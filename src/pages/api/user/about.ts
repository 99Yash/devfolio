import { connectDB } from '@/lib/utils/connect';
import UserModel, { UserDoc } from '@/models/user.model';
import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
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
      return res.status(200).send(returnedUser.about);
    } catch (err: any) {
      console.error(err);
    }
  } else if (req.method === 'GET') {
    try {
      const route = new URL(req.headers.referer!).pathname;
      //? check for auth if req is coming from home page, not the /portfolio/<userId> (public) page
      let userId = '';
      if (route === '/') {
        const auth = getAuth(req);
        if (!auth.userId)
          return res.status(401).send('No you are unauthorized');
        userId = auth.userId;
      } else {
        const regex = /\/portfolio\/(.*)/;
        const match = route.match(regex);
        const clerkUserId = match ? match[1] : null;
        if (!clerkUserId) return res.status(404).send('Not found user');
        const clerkIdStr = clerkUserId as string;
        userId = clerkIdStr;
      }
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
