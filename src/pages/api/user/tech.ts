import { connectDB } from '@/lib/utils/connect';
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
        techStack: user.techStack,
      });
    } catch (err: any) {
      console.error(err);
    }
  } else if (req.method === 'POST') {
    try {
      const { userId } = getAuth(req);
      if (!userId) return res.status(401).send('You are unauthorized');
      await connectDB();
      const user: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!user) return res.status(404).send("User doesn't exist");
      const { techStack } = req.body;
      const techStackArr = techStack.split(',').map((t: string) => t.trim());
      user.techStack?.push(...techStackArr);
      await user.save();
      return res.status(200).send({
        techStack: user.techStack,
      });
    } catch (err: any) {
      console.error(err);
    }
  }
}
