import { AppThunk } from 'src/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  EmailRegistrationFormData,
  PhoneNumberRegistrationFormData,
  RegistrationError,
} from 'src/types/lib';
import { AuthState } from 'src/types';
import {
  registerWithEmail as _registerWithEmail,
  registerWithPhoneNumber as _registerWithPhoneNumber,
} from 'src/services/auth';
import { AxiosResponse } from 'axios';
import history from 'src/services/history';
import { setMessage } from './verification';
import { BAD_REQUEST, SERVER_ERROR } from 'src/constants';
import { showToast } from 'src/services/notification';

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

export default authSlice.reducer;
