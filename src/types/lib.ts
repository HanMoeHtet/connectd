export interface Pronouns {
  subjective: string;
  objective: string;
  possessive: string;
}

export interface RegistrationFormData {
  username: string;
  password: string;
  birthday: Date;
  pronouns: Pronouns;
}

export interface EmailRegistrationFormData extends RegistrationFormData {
  email: string;
}

export interface PhoneNumberRegistrationFormData extends RegistrationFormData {
  phoneNumber: string;
}

export interface RegistrationError {
  username?: string[];
  email?: string[];
  phoneNumber?: string[];
  password?: string[];
  birthday?: string[];
  pronouns?: string[];
}

export interface RegisterSuccessResponse {
  message: string;
  data: {
    userId: string;
  };
}

export interface ResendResponse {
  message: string;
}

export interface VerifySuccessResponse {
  data: { token: string };
}

export interface BasicProfileResponse {
  data: { id: string; username: string; avatar?: string };
}
