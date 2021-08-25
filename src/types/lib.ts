import { NormalPost, SharedPost } from './post';

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

export interface LogInFormData {
  password: string;
}

export interface EmailLogInFormData extends LogInFormData {
  email: string;
}

export interface PhoneNumberLogInFormData extends LogInFormData {
  phoneNumber: string;
}

export interface LogInError {
  password?: string[];
  email?: string[];
  phoneNumber?: string[];
}

export interface LogInSuccessResponse {
  data: { token: string };
}

export interface BasicProfile {
  _id: string;
  username: string;
  avatar?: string;
}

export interface Profile extends BasicProfile {
  email?: string;
  phoneNumber?: string;
  birthday?: string;
  pronouns?: Pronouns;
}

export interface BasicProfileResponse {
  data: {
    user: BasicProfile;
  };
}

export interface CreatePostFormData {
  privacy: string;
  content: string;
  media?: File;
}

export interface CreatePostSuccessResponse {
  data: {
    post: NormalPost;
  };
}

export interface CreatePostError {
  content?: string[];
  privacy?: string[];
}

export interface CreateShareFormData {
  privacy: string;
  content: string;
  media?: File;
}

export interface CreateShareSuccessResponse {
  data: {
    post: SharedPost;
  };
}

export interface CreateShareError {
  content?: string[];
  privacy?: string[];
}

export enum NotificationType {
  FRIEND_REQUEST_RECEIVED = 'FRIEND_REQUEST_RECEIVED',
  FRIEND_REQUEST_ACCEPTED = 'FRIEND_REQUEST_ACCEPTED',
}
