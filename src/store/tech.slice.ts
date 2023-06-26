import { TechDoc } from '@/models/tech.model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TechStackState {
  techStack: TechDoc[];
}

const initialState: TechStackState = {
  techStack: [],
};

const TechSlice = createSlice({
  name: 'tech',
  initialState,
  reducers: {
    setTechStack: (state: TechStackState, action: PayloadAction<TechDoc[]>) => {
      state.techStack = action.payload;
    },
    updateTechStack: (
      state: TechStackState,
      action: PayloadAction<{ techStack: TechDoc[] }>
    ) => {
      state.techStack.push(...action.payload.techStack);
    },
    deleteTech: (
      state: TechStackState,
      action: PayloadAction<{ techId: string }>
    ) => {
      const updatedTech = state.techStack!.filter(
        (tech) => tech._id !== action.payload.techId
      );
      state.techStack = updatedTech ? updatedTech : [];
    },
  },
});

export const { setTechStack, deleteTech, updateTechStack } = TechSlice.actions;
export default TechSlice.reducer;
