import { Comment } from 'src/services/comment';
import { Profile, Pronouns } from './lib';
import { Post } from './post';

export interface AuthState {
  isLoading: boolean;
  userId: string | null;
}

export interface VerificationState {
  message: string | null;
}

export interface ProfileState {
  profile: Profile | null;
}

export interface PostsState {
  posts: Post[];
}

export interface CommentsState {
  comments: Map<string, Comment[]>;
}
