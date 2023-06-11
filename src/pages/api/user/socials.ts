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
      if (user.socials?.find((social) => social.name === name)) {
        res.status(409).send(`${name} link already exists`);
      }
      user.socials?.push(createdSocial);
      await user.save();
      res.status(200).send(createdSocial);
    } else {
      res.status(404).send({ message: 'user not found' });
    }
  } else if (req.method === 'GET') {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).send('Unauthorized');
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
