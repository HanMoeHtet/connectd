import { AppThunk } from 'src/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  EmailLogInFormData,
  EmailRegistrationFormData,
  LogInError,
  PhoneNumberLogInFormData,
  PhoneNumberRegistrationFormData,
  RegistrationError,
} from 'src/types/lib';
import { AuthState } from 'src/types';
import {
  registerWithEmail as _registerWithEmail,
  registerWithPhoneNumber as _registerWithPhoneNumber,
  logInWithEmail as _logInWithEmail,
  logInWithPhoneNumber as _logInWithPhoneNumber,
} from 'src/services/auth';
import { AxiosResponse } from 'axios';
import history from 'src/services/history';
import { setMessage } from './verification';
import {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  UNAUTHORIZED,
} from 'src/constants';
import { showToast } from 'src/services/notification';
import { fetchBasicProfile, setProfile } from './profile';
import { getToken, removeToken, setToken } from 'src/services/jwt';
import { fetNewNotificationsCount } from './notifications';

const initialState: AuthState = {
  isLoading: false,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setUserId(state, action: PayloadAction<string | null>) {
      state.userId = action.payload;
    },
  },
});

export const { setIsLoading, setUserId } = authSlice.actions;

export const registerWithEmail =
  (
    formData: EmailRegistrationFormData
  ): AppThunk<Promise<RegistrationError | undefined>> =>
  async (dispatch) => {
    dispatch(setIsLoading(true));

    let response;

    try {
      response = await _registerWithEmail(formData);
    } catch (e) {
      const { status, data } = e.response as AxiosResponse<{
        errors?: RegistrationError;
        message?: string;
      }>;

      if (status === BAD_REQUEST) {
        const { errors } = data;
        dispatch(setIsLoading(false));
        return errors;
      }

      if (status === SERVER_ERROR) {
        const { message } = data;
        showToast('error', message!);
      }

      dispatch(setIsLoading(false));
      return;
    }

    const { data, message } = response.data;
    const { userId } = data;
    dispatch(setUserId(userId));
    dispatch(setMessage(message));
    history.push('/verify/email');
    dispatch(setIsLoading(false));
  };

export const logInWithEmail =
  (formData: EmailLogInFormData): AppThunk<Promise<LogInError | undefined>> =>
  async (dispatch) => {
    dispatch(setIsLoading(true));

    let response;

    try {
      response = await _logInWithEmail(formData);
    } catch (e) {
      const { status, data } = e.response as AxiosResponse<{
        errors?: LogInError;
        message?: string;
      }>;

      if (
        status === BAD_REQUEST ||
        status === NOT_FOUND ||
        status === UNAUTHORIZED
      ) {
        const { errors } = data;
        dispatch(setIsLoading(false));
        return errors;
      }

      if (status === SERVER_ERROR) {
        const { message } = data;
        showToast('error', message!);
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

    try {
      await dispatch(fetNewNotificationsCount());
    } catch (e) {
      dispatch(setIsLoading(false));
      return;
    }

    history.push('/');
    dispatch(setIsLoading(false));
  };

export const logInWithPhoneNumber =
  (
    formData: PhoneNumberLogInFormData
  ): AppThunk<Promise<LogInError | undefined>> =>
  async (dispatch) => {
    dispatch(setIsLoading(true));

    let response;

    try {
      response = await _logInWithPhoneNumber(formData);
    } catch (e) {
      const { status, data } = e.response as AxiosResponse<{
        errors?: LogInError;
        message?: string;
      }>;

      if (
        status === BAD_REQUEST ||
        status === NOT_FOUND ||
        status === UNAUTHORIZED
      ) {
        const { errors } = data;
        dispatch(setIsLoading(false));
        return errors;
      }

      if (status === SERVER_ERROR) {
        const { message } = data;
        showToast('error', message!);
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

    try {
      await dispatch(fetNewNotificationsCount());
    } catch (e) {
      dispatch(setIsLoading(false));
      return;
    }

    history.push('/');
    dispatch(setIsLoading(false));
  };

export const registerWithPhoneNumber =
  (
    formData: PhoneNumberRegistrationFormData
  ): AppThunk<Promise<RegistrationError | undefined>> =>
  async (dispatch) => {
    dispatch(setIsLoading(true));

    let response;

    try {
      response = await _registerWithPhoneNumber(formData);
    } catch (e) {
      const { status, data } = e.response as AxiosResponse<{
        errors?: RegistrationError;
        message?: string;
      }>;

      if (status === BAD_REQUEST) {
        const { errors } = data;
        dispatch(setIsLoading(false));
        return errors;
      }

      if (status === SERVER_ERROR) {
        const { message } = data;
        showToast('error', message!);
      }

      dispatch(setIsLoading(false));
      return;
    }

    const { data, message } = response.data;
    const { userId } = data;
    dispatch(setUserId(userId));
    dispatch(setMessage(message));
    history.push('/verify/phone-number');

    dispatch(setIsLoading(false));
  };

export const checkAuth = (): AppThunk<Promise<void>> => async (dispatch) => {
  let token = getToken();

  if (!token) return;

  setToken(token);

  dispatch(setIsLoading(true));

  try {
    await dispatch(fetchBasicProfile());
  } catch (e) {
    dispatch(setIsLoading(false));
    return;
  }

  try {
    await dispatch(fetNewNotificationsCount());
  } catch (e) {
    dispatch(setIsLoading(false));
    return;
  }

  dispatch(setIsLoading(false));
};

export const logOut = (): AppThunk<Promise<void>> => async (dispatch) => {
  dispatch(setProfile(null));
  removeToken();
  history.replace('/login');
};

export default authSlice.reducer;
