import { connectDB } from '@/lib/utils/connect';
import TechModel, { TechDoc } from '@/models/tech.model';
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
      const userTech: TechDoc[] | null = await TechModel.find({
        clerkUserId: userId,
      });
      if (!user) return res.status(404).send("User doesn't exist");
      return res.status(200).send(userTech);
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
      const { techStack: fullTechString } = req.body;
      fullTechString.split(',').map(async (t: string) => {
        const tech = await TechModel.create({
          name: t.trim(),
          clerkUserId: userId,
        });
        if (!user.techStack) {
          user.techStack = [];
        }
        user.techStack?.push(tech._id);
      });
      const userTech = await TechModel.find<TechDoc>({
        clerkUserId: userId,
      });
      await user.save();
      return res.status(200).send(userTech);
    } catch (err: any) {
      console.error(err);
    }
  }
}
