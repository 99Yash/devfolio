import { connectDB } from '@/lib/utils/connect';
import ProjectModel from '@/models/project.model';
import UserModel, { UserDoc } from '@/models/user.model';
import { getAuth } from '@clerk/nextjs/server';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { userId } = getAuth(req);
      if (!userId) return res.status(401).send('You are unauthorized');
      await connectDB();
      const userToUpdate: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!userToUpdate) return res.status(404).send("User doesn't exist");
      const { project } = req.body;

      const createdProject = await ProjectModel.create({
        title: project.title,
        description: project.description,
        githubLink: project.githubLink,
        demoLink: project.demoLink,
        techStack: project.techStack.includes(',')
          ? project.techStack.split(',').map((t: string) => t.trim())
          : [project.techStack],
        clerkUserId: userId,
      });

      return res.status(201).send({ project: createdProject });
    } catch (err: any) {
      console.error(err);
    }
  } else if (req.method === 'GET') {
    try {
      const route = new URL(req.headers.referer!).pathname;
      //? check for auth only if req is coming from home page, not the /portfolio/<userId> (public) page
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
      const projectUser: UserDoc | null = await UserModel.findOne({
        clerkUserId: userId,
      });
      if (!projectUser) return res.status(404).send("User doesn't exist");
      const projectsArr = await ProjectModel.find({
        clerkUserId: userId,
      });
      return res.status(200).send({ projects: projectsArr });
    } catch (err: any) {
      console.error(err);
    }
  } else if (req.method === 'PUT') {
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

      projectToUpdate.title = project.title;
      projectToUpdate.description = project.description;
      projectToUpdate.techStack = project.techStack;
      projectToUpdate.githubLink = project.githubLink;
      projectToUpdate.demoLink = project.demoLink;
      const updatedProj = await projectToUpdate.save();
      return res.status(200).send(updatedProj);
    } catch (err: any) {
      console.error(err);
    }
  }
}
