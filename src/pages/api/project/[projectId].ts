import { connectDB } from '@/lib/utils/connect';
import ProjectModel from '@/models/project.model';
import UserModel, { UserDoc } from '@/models/user.model';
import { getAuth } from '@clerk/nextjs/server';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

//?to get the details of a single project(for the edit modal)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).send('You are unauthorized');
    try {
      await connectDB();
      const project = await ProjectModel.findOne({
        _id: req.query.projectId,
        clerkUserId: userId,
      });
      if (!project) return res.status(404).send("Project doesn't exist");
      return res.status(200).send({ project });
    } catch (err: any) {
      console.error(err);
    }
  } else if (req.method === 'PATCH') {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).send('You are unauthorized');
    try {
      await connectDB();
      const projectUser: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!projectUser) return res.status(404).send("User doesn't exist");
      const { project } = req.body;
      const projId = new mongoose.Types.ObjectId(project._id);

      const projectToUpdate = await ProjectModel.findById(projId);
      if (!projectToUpdate)
        return res.status(404).send("Project doesn't exist");

      const techStackArr = project.techStack
        .split(',')
        .map((t: string) => t.trim());
      projectToUpdate.title = project.title;
      projectToUpdate.description = project.description;
      projectToUpdate.techStack = techStackArr;
      projectToUpdate.githubLink = project.githubLink;
      projectToUpdate.demoLink = project.demoLink;
      await projectToUpdate.save();
      return res.status(200).send('Project updated');
    } catch (err: any) {
      console.error(err);
    }
  }
}
