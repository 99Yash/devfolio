import { createSlice } from '@reduxjs/toolkit';

interface TechStack {
  techStack: string[] | undefined;
}

const initialState: TechStack = {
  techStack: undefined,
};

const TechSlice = createSlice({
  name: 'techStack',
  initialState,
  reducers: {
    setTechStack: (state, action) => {
      state.techStack = action.payload;
    },
  },
});
