import { BasicProfile } from 'src/types/lib';
import { ReactionType, UpdatedFieldsInComment } from 'src/types/post';
import api from './api';

interface FetchReactionsInCommentOptions {
  commentId: string;
  limit: number;
  lastReactionId?: string;
  reactionType: ReactionType | 'ALL';
}
export interface FetchReactionsInCommentResponse {
  data: {
    reactions: {
      _id: string;
      userId: string;
      type: ReactionType;
      user: BasicProfile;
    }[];
    comment: UpdatedFieldsInComment;
  };
}
export const fetchReactionsInComment = ({
  commentId,
  limit,
  lastReactionId,
  reactionType,
}: FetchReactionsInCommentOptions) => {
  return api.get<FetchReactionsInCommentResponse>(
    `/comments/${commentId}/reactions?lastReactionId=${
      lastReactionId || ''
    }&limit=${limit}&reactionType=${reactionType}`
  );
};

interface AddReactionToCommentOptions {
  commentId: string;
  type: ReactionType;
}
export interface AddReactionToCommentResponse {
  data: {
    comment: UpdatedFieldsInComment;
  };
}
export const addReactionToComment = ({
  commentId,
  type,
}: AddReactionToCommentOptions) => {
  return api.post<AddReactionToCommentResponse>(
    `/comments/${commentId}/reactions`,
    {
      type,
    }
  );
};

interface RemoveReactionFromCommentOptions {
  commentId: string;
}
export interface RemoveReactionFromCommentResponse {
  data: {
    comment: UpdatedFieldsInComment;
  };
}
export const removeReactionFromComment = ({
  commentId,
}: RemoveReactionFromCommentOptions) => {
  return api.delete<RemoveReactionFromCommentOptions>(
    `/comments/${commentId}/reactions`
  );
};
