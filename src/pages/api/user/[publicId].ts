import ExperienceModel, { ExperienceDoc } from '@/models/experience.model';
import ProjectModel, { ProjectDoc } from '@/models/project.model';
import SocialsModel, { SocialDoc } from '@/models/social.model';
import TechModel, { TechDoc } from '@/models/tech.model';
import UserModel, { UserDoc } from '@/models/user.model';
import { clerkClient } from '@clerk/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { publicId: clerkUserId } = req.query;
  const clerkIdStr = clerkUserId as string;
  const userId = clerkIdStr;
  if (req.method === 'GET') {
    const mongoUser: UserDoc | null = await UserModel.findOne({
      clerkUserId: clerkIdStr,
    });
    if (!mongoUser) return res.status(404).send("User doesn't exist");

    const projects: ProjectDoc[] | null = await ProjectModel.find({
      clerkUserId: clerkIdStr,
    });
    const experiences: ExperienceDoc[] | null = await ExperienceModel.find({
      clerkUserId: clerkIdStr,
    });
    const socials: SocialDoc[] | null = await SocialsModel.find({
      clerkUserId: clerkIdStr,
    });
    const techStack: TechDoc[] | null = await TechModel.find({
      clerkUserId: clerkIdStr,
    });
    const clerkUserImage = (await clerkClient.users.getUser(userId))
      .profileImageUrl;

    return res.status(200).send({
      projects: projects ? projects : [],
      mongoUser,
      experiences: experiences ? experiences : [],
      socials: socials ? socials : [],
      techStack: techStack ? techStack : [],
      clerkUserImage,
    });
  }
}
