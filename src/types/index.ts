import { Pronouns } from './lib';
import { Post } from './post';

export interface AuthState {
  isLoading: boolean;
  userId: string | null;
}

export interface VerificationState {
  message: string | null;
}

export interface ProfileState {
  _id: string;
  username: string;
  avatar: string;
  email?: string;
  phoneNumber?: string;
  birthday?: string;
  pronouns?: Pronouns;
}

export interface PostsState {
  posts: Post[];
}
