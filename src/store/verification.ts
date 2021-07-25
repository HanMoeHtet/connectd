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
import { setUserId } from './auth';
import { AxiosResponse } from 'axios';
import {
  BAD_REQUEST,
  CONFLICT,
  SERVER_ERROR,
  UNAUTHORIZED,
} from 'src/constants';
import { showToast } from 'src/services/notification';
import { setToken } from 'src/services/jwt';

const initialState: VerificationState = {
  isLoading: false,
  message: null,
};

const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setMessage(state, action: PayloadAction<string | null>) {
      state.message = action.payload;
    },
  },
});

export const { setIsLoading, setMessage } = verificationSlice.actions;

export const verifyEmail =
  (token: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setIsLoading(true));

    try {
      const { token: accessToken } = (await _verifyEmail(token)).data;
      setToken(accessToken);
      // TODO: login user
      history.push('/newsfeed');
    } catch (e) {
      const { status, data } = e.response as AxiosResponse<{
        message: string;
      }>;

      const { message } = data;

      if (status === BAD_REQUEST) {
        showToast('error', message);
      }
    }
  };

export const resendEmail = (): AppThunk => async (dispatch, getState) => {
  const { userId } = getState().authStore;

  if (!userId) {
    showToast('error', 'An error occurred.');
    return history.push('/login');
  }

  dispatch(setIsLoading(true));
  try {
    const { message } = (await _resendEmail(userId)).data;
    dispatch(setMessage(message));
    showToast('success', message);
    history.replace('/verify/email');
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
  }
  dispatch(setIsLoading(false));
};

export const verifyPhoneNumber =
  (otp: string): AppThunk =>
  async (dispatch, getState) => {
    const { userId } = getState().authStore;
    if (!userId) {
      // FIXME: replace message with i18n
      showToast('error', 'An error occurred.');
      return history.push('/login');
    }

    dispatch(setIsLoading(true));

    try {
      const { token } = (await _verifyPhoneNumber(userId, otp)).data;
      setToken(token);
      // TODO: login user
      history.push('/newsfeed');
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
    }
  };

export const resendOTP = (): AppThunk => async (dispatch, getState) => {
  const { userId } = getState().authStore;

  if (!userId) {
    // FIXME: replace message with i18n
    showToast('error', 'An error occurred.');
    return history.push('/login');
  }

  dispatch(setIsLoading(true));
  try {
    const { message } = (await _resendOTP(userId)).data;
    dispatch(setMessage(message));
    showToast('success', message);
    history.replace('/verify/email');
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
  }
  dispatch(setIsLoading(false));
};

export default verificationSlice.reducer;
