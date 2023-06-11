import { ExperienceDoc } from '@/models/experience.model';
import { ProjectDoc } from '@/models/project.model';
import { UserDoc } from '@/models/user.model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Schema } from 'mongoose';
import { TechDoc } from '../models/tech.model';
import { SocialDoc } from '@/models/social.model';

interface UserState {
  user: UserDoc | undefined;
  techStack: TechDoc[];
  projects: ProjectDoc[];
  experiences: ExperienceDoc[];
  socials: SocialDoc[];
}

const initialState: UserState = {
  user: undefined,
  techStack: [],
  projects: [],
  experiences: [],
  socials: [],
};

const UserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state: UserState, action: PayloadAction<UserDoc>) => {
      state.user = action.payload;
    },
    updateAbout(state: UserState, action: PayloadAction<{ about: string }>) {
      state.user!.about = action.payload.about;
    },
    setCurrentProjects: (
      state: UserState,
      action: PayloadAction<ProjectDoc[]>
    ) => {
      state.projects = action.payload;

      if (state.user?.projects?.length === 0) {
        state.user?.projects.push(
          action.payload.forEach((project) => project._id)
        );
      }
    },
    addProject(
      state: UserState,
      action: PayloadAction<{
        project: ProjectDoc;
      }>
    ) {
      state?.projects?.push(action.payload.project);
      state?.user?.projects?.push(action.payload.project._id);
    },
    editProject(
      state: UserState,
      action: PayloadAction<{ project: ProjectDoc }>
    ) {
      state?.projects?.map((project) => {
        if (project._id === action.payload.project._id) {
          if (action.payload.project.description) {
            project.description = action.payload.project.description;
          }
          if (action.payload.project.demoLink) {
            project.demoLink = action.payload.project.demoLink;
          }
          if (action.payload.project.githubLink) {
            project.githubLink = action.payload.project.githubLink;
          }
          if (action.payload.project.techStack) {
            project.techStack = action.payload.project.techStack;
          }
          if (action.payload.project.title) {
            project.title = action.payload.project.title;
          }
        }
      });
    },
    deleteProject(
      state: UserState,
      action: PayloadAction<{ projectId: string }>
    ) {
      const updatedProjectsList = state.projects!.filter(
        (project) => project._id !== action.payload.projectId
      );
      state.projects = updatedProjectsList ? updatedProjectsList : [];
      state.user!.projects = state.user?.projects?.filter(
        (id: Schema.Types.ObjectId) =>
          id.toString() !== action.payload.projectId.toString()
      );
    },
    setTechStack: (state: UserState, action: PayloadAction<TechDoc[]>) => {
      state.techStack = action.payload;
    },
    updateTechStack: (
      state: UserState,
      action: PayloadAction<{ techStack: TechDoc[] }>
    ) => {
      state.techStack.push(...action.payload.techStack);
      state.user?.techStack.push(
        ...action.payload.techStack.map((tech) => tech._id)
      );
    },
    deleteTech: (
      state: UserState,
      action: PayloadAction<{ techId: string }>
    ) => {
      const updatedTech = state.techStack!.filter(
        (tech) => tech._id !== action.payload.techId
      );
      state.techStack = updatedTech ? updatedTech : [];
      state.user!.techStack = state.user!.techStack?.filter(
        (id: Schema.Types.ObjectId) =>
          id.toString() !== action.payload.techId.toString()
      );
    },
    setExperiences: (
      state: UserState,
      action: PayloadAction<ExperienceDoc[]>
    ) => {
      state.experiences = action.payload;
    },
    addExperience: (
      state: UserState,
      action: PayloadAction<{ experience: ExperienceDoc }>
    ) => {
      state.experiences.push(action.payload.experience);
      state.user?.experiences?.push(action.payload.experience._id);
    },
    editExperience: (
      state: UserState,
      action: PayloadAction<{ experience: ExperienceDoc }>
    ) => {
      state.experiences.map((experience) => {
        if (experience._id === action.payload.experience._id) {
          if (action.payload.experience.companyName) {
            experience.companyName = action.payload.experience.companyName;
          }
          if (action.payload.experience.description) {
            experience.description = action.payload.experience.description;
          }
          if (action.payload.experience.endDate) {
            experience.endDate = action.payload.experience.endDate;
          }
          if (action.payload.experience.startDate) {
            experience.startDate = action.payload.experience.startDate;
          }
          if (action.payload.experience.position) {
            experience.position = action.payload.experience.position;
          }
        }
      });
    },
    deleteExperience: (
      state: UserState,
      action: PayloadAction<{ experienceId: string }>
    ) => {
      const updatedExperiences = state.experiences!.filter(
        (experience) => experience._id !== action.payload.experienceId
      );
      state.experiences = updatedExperiences ? updatedExperiences : [];
      state.user!.experiences = state.user!.experiences?.filter(
        (id: Schema.Types.ObjectId) =>
          id.toString() !== action.payload.experienceId.toString()
      );
    },
    updateUserProfile: (
      state: UserState,
      action: PayloadAction<{
        fullName: string;
        oneLiner: string;
      }>
    ) => {
      state.user!.fullName = action.payload.fullName;
      state.user!.oneLiner = action.payload.oneLiner;
    },
    setSocialLinks: (state: UserState, action: PayloadAction<SocialDoc[]>) => {
      state.socials = action.payload;
    },
    addSocialLink: (
      state: UserState,
      action: PayloadAction<{
        socialLink: SocialDoc;
      }>
    ) => {
      state.socials.push(action.payload.socialLink);
      state.user!.socials?.push(action.payload.socialLink);
    },
    deleteSocialLink: (
      state: UserState,
      action: PayloadAction<{
        socialId: string;
      }>
    ) => {
      const updatedSocials = state.socials!.filter(
        (social) => social._id !== action.payload.socialId
      );
      state.socials = updatedSocials ? updatedSocials : [];
      state.user!.socials = state.user!.socials?.filter(
        (id: Schema.Types.ObjectId) => id.toString() !== action.payload.socialId
      );
    },
  },
});

export const {
  setCurrentUser,
  addProject,
  deleteProject,
  updateAbout,
  editProject,
  setCurrentProjects,
  setTechStack,
  deleteTech,
  updateTechStack,
  setExperiences,
  addExperience,
  editExperience,
  deleteExperience,
  updateUserProfile,
  setSocialLinks,
  addSocialLink,
  deleteSocialLink,
} = UserSlice.actions;
export default UserSlice.reducer;
