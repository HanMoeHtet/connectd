import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { fetchBasicProfile as _fetchBasicProfile } from 'src/services/profile';
import { ProfileState } from 'src/types';
import { AppThunk } from '.';

const initialState = null;

const profileSlice = createSlice<
  ProfileState | null,
  SliceCaseReducers<ProfileState | null>,
  string
>({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileState | null>) {
      return action.payload;
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

    const { data } = response;
    dispatch(setProfile(data));
  };

export default profileSlice.reducer;
