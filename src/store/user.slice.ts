import { UserDoc } from '@/models/user.model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: UserDoc | undefined;
}

const initialState: UserState = {
  user: undefined,
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
  },
});

export const { setCurrentUser, updateAbout, updateUserProfile } =
  UserSlice.actions;
export default UserSlice.reducer;
