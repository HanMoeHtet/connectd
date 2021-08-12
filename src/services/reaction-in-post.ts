import { BasicProfile } from 'src/types/lib';
import { ReactionType, UpdatedFieldsInPost } from 'src/types/post';
import api from './api';

interface FetchReactionsInPostOptions {
  postId: string;
  limit: number;
  lastReactionId?: string;
  reactionType: ReactionType | 'ALL';
}
export interface FetchReactionsInPostResponse {
  data: {
    reactions: {
      _id: string;
      userId: string;
      type: ReactionType;
      user: BasicProfile;
    }[];
    post: UpdatedFieldsInPost;
  };
}
export const fetchReactionsInPost = ({
  postId,
  limit,
  lastReactionId,
  reactionType,
}: FetchReactionsInPostOptions) => {
  return api.get<FetchReactionsInPostResponse>(
    `/posts/${postId}/reactions?lastReactionId=${
      lastReactionId || ''
    }&limit=${limit}&reactionType=${reactionType}`
  );
};

interface AddReactionToPostOptions {
  postId: string;
  type: ReactionType;
}
export interface AddReactionToPostResponse {
  data: {
    post: UpdatedFieldsInPost;
  };
}
export const addReactionToPost = ({
  postId,
  type,
}: AddReactionToPostOptions) => {
  return api.post<AddReactionToPostResponse>(`/posts/${postId}/reactions`, {
    type,
  });
};

interface RemoveReactionFromPostOptions {
  postId: string;
}
export interface RemoveReactionFromPostResponse {
  data: {
    post: UpdatedFieldsInPost;
  };
}
export const removeReactionFromPost = ({
  postId,
}: RemoveReactionFromPostOptions) => {
  return api.delete<RemoveReactionFromPostResponse>(
    `/posts/${postId}/reactions`
  );
};
