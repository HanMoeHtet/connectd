import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBasicProfile as _fetchBasicProfile } from 'src/services/profile';
import { ProfileState } from 'src/types';
import { Profile } from 'src/types/lib';
import { AppThunk } from '.';

const initialState: ProfileState = {
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Profile | null>) {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export const fetchBasicProfile =
  (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    let response;

    try {
      response = await _fetchBasicProfile();
    } catch (e) {
      throw e;
    }

    const { user } = response.data.data;
    dispatch(setProfile(user));
  };

export default profileSlice.reducer;
