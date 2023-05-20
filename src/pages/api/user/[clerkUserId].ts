import { connectDB } from '@/lib/utils/connect';
import UserModel, { UserDoc } from '@/models/user.model';
import { NextApiRequest, NextApiResponse } from 'next';

//this signs in the user if not signed in and returns the user object
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { clerkUserId } = req.query;
  if (clerkUserId === 'undefined')
    return res.status(400).send('Fuck you idiot');
  try {
    await connectDB();
    const user: UserDoc | null = await UserModel.findOne({
      clerkUserId,
    });
    if (!user) {
      const createdUser = await UserModel.create({
        clerkUserId,
      });
      console.log(createdUser);
      return res.status(200).send({ createdUser });
    } else {
      res.status(200).send({ user });
    }
  } catch (err: any) {
    console.error(err);
  }
}
