import { Pronouns } from './lib';

export interface AuthState {
  isLoading: boolean;
  userId: string | null;
}

export interface VerificationState {
  isLoading: boolean;
  message: string | null;
}

export interface ProfileState {
  id: string;
  username: string;
  avatar: string;
  email?: string;
  phoneNumber?: string;
  birthday?: string;
  pronouns?: Pronouns;
}
