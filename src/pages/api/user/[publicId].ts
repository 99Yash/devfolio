import ExperienceModel, { ExperienceDoc } from '@/models/experience.model';
import ProjectModel, { ProjectDoc } from '@/models/project.model';
import SocialsModel, { SocialDoc } from '@/models/social.model';
import TechModel, { TechDoc } from '@/models/tech.model';
import UserModel, { UserDoc } from '@/models/user.model';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { publicId: clerkUserId } = req.query;
  const clerkIdStr = clerkUserId as string;
  if (req.method === 'GET') {
    const mongoUser: UserDoc | null = await UserModel.findOne({
      clerkUserId: clerkIdStr,
    });
    if (!mongoUser) return res.status(404).send("User doesn't exist");
    if (mongoUser.projects?.length && mongoUser.projects.length > 0) {
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
      return res.status(200).send({
        projects: projects ? projects : [],
        mongoUser,
        experiences: experiences ? experiences : [],
        socials: socials ? socials : [],
        techStack: techStack ? techStack : [],
      });
    }
  }
}
