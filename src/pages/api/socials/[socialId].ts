import { connectDB } from '@/lib/utils/connect';
import SocialsModel from '@/models/social.model';
import UserModel, { UserDoc } from '@/models/user.model';
import { getAuth } from '@clerk/nextjs/server';
import { Types } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).send('Unauthorized');
    const { socialId } = req.query;
    const socialIdStr = socialId as string;
    const socialIdToDelete = new Types.ObjectId(socialIdStr);
    try {
      await connectDB();
      const user: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!user) return res.status(404).send("User doesn't exist");

      await SocialsModel.findByIdAndDelete(socialIdToDelete);
      await UserModel.findByIdAndUpdate(user._id, {
        $pull: {
          socials: socialIdStr,
        },
      });
      return res.status(200).send('Social deleted');
    } catch (err: any) {
      console.error(err);
    }
  }
}
