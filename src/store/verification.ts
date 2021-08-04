import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '.';
import {
  resendEmail as _resendEmail,
  verifyEmail as _verifyEmail,
  resendOTP as _resendOTP,
  verifyPhoneNumber as _verifyPhoneNumber,
} from 'src/services/auth';
import { VerificationState } from 'src/types';
import history from 'src/services/history';
import { AxiosResponse } from 'axios';
import {
  BAD_REQUEST,
  CONFLICT,
  SERVER_ERROR,
  UNAUTHORIZED,
} from 'src/constants';
import { showToast } from 'src/services/notification';
import { setToken } from 'src/services/jwt';
import { fetchBasicProfile } from './profile';
import { setIsLoading } from './auth';

const initialState: VerificationState = {
  message: null,
};

const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<string | null>) {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = verificationSlice.actions;

export const verifyEmail =
  (token: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setIsLoading(true));

    let response;

    try {
      response = await _verifyEmail(token);
    } catch (e) {
      const { status, data } = e.response as AxiosResponse<{
        message: string;
      }>;

      const { message } = data;

      if (status === BAD_REQUEST) {
        showToast('error', message);
      }

      history.replace('/login');
      dispatch(setIsLoading(false));
      return;
    }

    const { token: accessToken } = response.data.data;
    setToken(accessToken);

    try {
      await dispatch(fetchBasicProfile());
    } catch (e) {
      // FIXME: replace with i18next
      showToast('error', 'Failed to load user profile');
      history.replace('/login');
      dispatch(setIsLoading(false));
      return;
    }

    history.replace('/');
    dispatch(setIsLoading(false));
  };

export const resendEmail = (): AppThunk => async (dispatch, getState) => {
  const { userId } = getState().authStore;

  if (!userId) {
    showToast('error', 'An error occurred.');
    return history.replace('/login');
  }

  dispatch(setIsLoading(true));

  let response;

  try {
    response = await _resendEmail(userId);
  } catch (e) {
    const { status, data } = e.response as AxiosResponse<{
      message: string;
    }>;

    const { message } = data;

    if (status === BAD_REQUEST) {
      showToast('error', message);
    }

    if (status === CONFLICT) {
      showToast('error', message);
    }

    if (status === SERVER_ERROR) {
      showToast('error', message);
    }

    dispatch(setIsLoading(false));
    return;
  }

  const { message } = response.data;
  dispatch(setMessage(message));
  showToast('success', message);
  history.replace('/verify/email');

  dispatch(setIsLoading(false));
};

export const verifyPhoneNumber =
  (otp: string): AppThunk =>
  async (dispatch, getState) => {
    const { userId } = getState().authStore;
    if (!userId) {
      // FIXME: replace message with i18n
      showToast('error', 'An error occurred.');
      return history.replace('/login');
    }

    dispatch(setIsLoading(true));

    let response;

    try {
      response = await _verifyPhoneNumber(userId, otp);
    } catch (e) {
      const { status, data } = e.response as AxiosResponse<{
        message: string;
      }>;

      const { message } = data;

      if (status === BAD_REQUEST) {
        showToast('error', message);
      }

      if (status === UNAUTHORIZED) {
        showToast('error', message);
      }

      dispatch(setIsLoading(false));
      return;
    }

    const { token } = response.data.data;
    setToken(token);

    try {
      await dispatch(fetchBasicProfile());
    } catch (e) {
      // FIXME: replace with i18next
      showToast('error', 'Failed to load user profile');
      dispatch(setIsLoading(false));
      return;
    }

    history.push('/');
    dispatch(setIsLoading(false));
  };

export const resendOTP = (): AppThunk => async (dispatch, getState) => {
  const { userId } = getState().authStore;

  if (!userId) {
    // FIXME: replace message with i18n
    showToast('error', 'An error occurred.');
    return history.replace('/login');
  }

  dispatch(setIsLoading(true));

  let response;

  try {
    response = await _resendOTP(userId);
  } catch (e) {
    const { status, data } = e.response as AxiosResponse<{
      message: string;
    }>;

    const { message } = data;

    if (status === BAD_REQUEST) {
      showToast('error', message);
    }

    if (status === CONFLICT) {
      showToast('error', message);
    }

    if (status === SERVER_ERROR) {
      showToast('error', message);
    }

    dispatch(setIsLoading(false));
    return;
  }

  const { message } = response.data;
  dispatch(setMessage(message));
  showToast('success', message);
  history.replace('/verify/email');

  dispatch(setIsLoading(false));
};

export default verificationSlice.reducer;
