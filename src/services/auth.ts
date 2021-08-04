import api from 'src/services/api';
import {
  EmailLogInFormData,
  EmailRegistrationFormData,
  LogInSuccessResponse,
  PhoneNumberLogInFormData,
  PhoneNumberRegistrationFormData,
  RegisterSuccessResponse,
  ResendResponse,
  VerifySuccessResponse,
} from 'src/types/lib';

export const registerWithEmail = (formData: EmailRegistrationFormData) => {
  return api.post<RegisterSuccessResponse>(`/auth/register/email`, formData);
};

export const resendEmail = (userId: string) => {
  return api.post<ResendResponse>(`/auth/resend/email`, { userId });
};

export const verifyEmail = (token: string) => {
  return api.post<VerifySuccessResponse>('/auth/verify/email', { token });
};

export const logInWithEmail = (formData: EmailLogInFormData) => {
  return api.post<LogInSuccessResponse>('/auth/login/email', formData);
};

export const registerWithPhoneNumber = (
  formData: PhoneNumberRegistrationFormData
) => {
  return api.post<RegisterSuccessResponse>(
    '/aut/register/phone-number',
    formData
  );
};

export const resendOTP = (userId: string) => {
  return api.post<ResendResponse>(`/auth/resend/phone-number`, {
    userId,
  });
};

export const verifyPhoneNumber = (userId: string, otp: string) => {
  return api.post<VerifySuccessResponse>('/auth/verify/phone-number', {
    userId,
    otp,
  });
};

export const logInWithPhoneNumber = (formData: PhoneNumberLogInFormData) => {
  return api.post<LogInSuccessResponse>('/auth/login/phone-number', formData);
};
