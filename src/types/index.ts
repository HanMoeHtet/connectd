import { BasicProfile, Profile } from './lib';
import { Post } from './post';
import { Conversation as BaseConversation } from 'src/services/user';
import { Message } from 'src/services/conversation';

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

export interface OnlineStatusState {
  userIds: string[];
  users: BasicProfile[];
}

export interface Conversation extends BaseConversation {
  messages: Message[];
}

export interface ConversationsState {
  conversations: Conversation[];
  currentConversationIndex: number | null;
}
