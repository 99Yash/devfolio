import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import userReducer from './user.slice';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    currentUser: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(
  store.dispatch as (action: any) => any // this is a hack
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { useFetchUserQuery } from './userApi';
