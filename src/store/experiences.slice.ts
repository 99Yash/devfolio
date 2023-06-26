import { ExperienceDoc } from '@/models/experience.model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ExperiencesState {
  experiences: ExperienceDoc[];
}

const initialState: ExperiencesState = {
  experiences: [],
};

const ExperiencesSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setExperiences: (
      state: ExperiencesState,
      action: PayloadAction<ExperienceDoc[]>
    ) => {
      state.experiences = action.payload;
    },
    addExperience: (
      state: ExperiencesState,
      action: PayloadAction<{ experience: ExperienceDoc }>
    ) => {
      state.experiences.push(action.payload.experience);
    },
    editExperience: (
      state: ExperiencesState,
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
      state: ExperiencesState,
      action: PayloadAction<{ experienceId: string }>
    ) => {
      const updatedExperiences = state.experiences!.filter(
        (experience) => experience._id !== action.payload.experienceId
      );
      state.experiences = updatedExperiences ? updatedExperiences : [];
    },
  },
});

export const {
  setExperiences,
  addExperience,
  deleteExperience,
  editExperience,
} = ExperiencesSlice.actions;
export default ExperiencesSlice.reducer;
