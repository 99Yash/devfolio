import { SocialDoc } from '@/models/social.model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SocialState {
  socials: SocialDoc[];
}

const initialState: SocialState = {
  socials: [],
};

const SocialSlice = createSlice({
  name: 'socials',
  initialState,
  reducers: {
    setSocialLinks: (
      state: SocialState,
      action: PayloadAction<SocialDoc[]>
    ) => {
      state.socials = action.payload;
    },
    addSocialLink: (
      state: SocialState,
      action: PayloadAction<{
        socialLink: SocialDoc;
      }>
    ) => {
      state.socials.push(action.payload.socialLink);
    },
    deleteSocialLink: (
      state: SocialState,
      action: PayloadAction<{
        socialId: string;
      }>
    ) => {
      const updatedSocials = state.socials!.filter(
        (social) => social._id !== action.payload.socialId
      );
      state.socials = updatedSocials ? updatedSocials : [];
    },
  },
});

export const { setSocialLinks, addSocialLink, deleteSocialLink } =
  SocialSlice.actions;
export default SocialSlice.reducer;
