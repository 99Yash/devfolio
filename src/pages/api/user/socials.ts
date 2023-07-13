import SocialsModel, { SocialDoc } from '@/models/social.model';
import UserModel, { UserDoc } from '@/models/user.model';
import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).send('Unauthorized');
    const user: UserDoc | null = await UserModel.findOne({
      clerkUserId: userId,
    });
    if (user) {
      const { name, url } = req.body;
      const createdSocial = await SocialsModel.create({
        name,
        url,
        clerkUserId: userId,
      });
      res.status(200).send(createdSocial);
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } else if (req.method === 'GET') {
    const route = new URL(req.headers.referer!).pathname;
    //? check for auth only if req is coming from home page, not the /portfolio/<userId> (public) page
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
    const user: UserDoc | null = await UserModel.findOne({
      clerkUserId: userId,
    });
    if (user) {
      const socials: SocialDoc[] | null = await SocialsModel.find({
        clerkUserId: userId,
      });
      res.status(200).send(socials);
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  }
}
