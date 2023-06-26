import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import userReducer from './user.slice';
import projectReducer from './projects.slice';
import experienceReducer from './experiences.slice';
import socialsReducer from './socials.slice';
import techStackReducer from './tech.slice';

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    projects: projectReducer,
    experiences: experienceReducer,
    socials: socialsReducer,
    techStack: techStackReducer,
  },
});

setupListeners(
  store.dispatch as (action: any) => any // this is a hack
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
