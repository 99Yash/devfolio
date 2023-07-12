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
      const userTech: TechDoc[] | null = await TechModel.find({
        clerkUserId: userId,
      });
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

      const techNames = fullTechString.split(',').map((t: string) => t.trim());

      const newlyAddedTech = await Promise.all(
        techNames.map(async (t: string) => {
          const tech = await TechModel.create({
            name: t,
            clerkUserId: userId,
          });
          return tech;
        })
      );
      return res.status(200).send(newlyAddedTech);
    } catch (err: any) {
      console.error(err);
    }
  }
}
