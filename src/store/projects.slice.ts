import { ProjectDoc } from '@/models/project.model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProjectState {
  projects: ProjectDoc[] | undefined;
}

const initialState: ProjectState = {
  projects: [],
};

const ProjectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state: ProjectState, action: PayloadAction<ProjectState>) => {
      state.projects = action.payload.projects;
    },
    addProject: (
      state: ProjectState,
      action: PayloadAction<{
        project: ProjectDoc;
      }>
    ) => {
      state.projects?.push(action.payload.project);
    },
  },
});

export const { setProjects, addProject } = ProjectsSlice.actions;
export default ProjectsSlice.reducer;
