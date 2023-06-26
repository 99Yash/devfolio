import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProjectDoc } from '../models/project.model';

interface ProjectsState {
  projects: ProjectDoc[];
}

const initialState: ProjectsState = {
  projects: [],
};

const ProjectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (
      state: ProjectsState,
      action: PayloadAction<ProjectDoc[]>
    ) => {
      state.projects = action.payload;
    },
    addProject(
      state: ProjectsState,
      action: PayloadAction<{
        project: ProjectDoc;
      }>
    ) {
      state?.projects?.push(action.payload.project);
    },
    editProject(
      state: ProjectsState,
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
      state: ProjectsState,
      action: PayloadAction<{ projectId: string }>
    ) {
      const updatedProjectsList = state.projects!.filter(
        (project) => project._id !== action.payload.projectId
      );
      state.projects = updatedProjectsList ? updatedProjectsList : [];
    },
  },
});

export const { setProjects, addProject, editProject, deleteProject } =
  ProjectsSlice.actions;
export default ProjectsSlice.reducer;
