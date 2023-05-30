import { ExperienceDoc } from '@/models/experience.model';
import { ProjectDoc } from '@/models/project.model';
import { UserDoc } from '@/models/user.model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TechDoc } from '../models/tech.model';

interface UserState {
  user: UserDoc | undefined;
  techStack: TechDoc[] | undefined;
  projects: ProjectDoc[] | undefined;
  experiences: ExperienceDoc[] | undefined;
}

const initialState: UserState = {
  user: undefined,
  techStack: [],
  projects: [],
  experiences: [],
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
    },
    addProject(
      state: UserState,
      action: PayloadAction<{
        project: ProjectDoc;
      }>
    ) {
      state?.projects?.push(action.payload.project);
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
      const updatedProjects = state.projects!.filter(
        (project) => project._id !== action.payload.projectId
      );
      state.projects = updatedProjects ? updatedProjects : [];
    },
    setTechStack: (state: UserState, action: PayloadAction<TechDoc[]>) => {
      state.techStack = action.payload;
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
} = UserSlice.actions;
export default UserSlice.reducer;
