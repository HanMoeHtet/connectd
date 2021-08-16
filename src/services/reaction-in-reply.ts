import { BasicProfile } from 'src/types/lib';
import { ReactionType, UpdatedFieldsInReply } from 'src/types/post';
import api from './api';

interface FetchReactionsInReplyOptions {
  replyId: string;
  limit: number;
  lastReactionId?: string;
  reactionType: ReactionType | 'ALL';
}
export interface FetchReactionsInReplyResponse {
  data: {
    reactions: {
      _id: string;
      userId: string;
      type: ReactionType;
      user: BasicProfile;
    }[];
    reply: UpdatedFieldsInReply;
  };
}
export const fetchReactionsInReply = ({
  replyId,
  limit,
  lastReactionId,
  reactionType,
}: FetchReactionsInReplyOptions) => {
  return api.get<FetchReactionsInReplyResponse>(
    `/replies/${replyId}/reactions?lastReactionId=${
      lastReactionId || ''
    }&limit=${limit}&reactionType=${reactionType}`
  );
};

interface AddReactionToReplyOptions {
  replyId: string;
  type: ReactionType;
}
export interface AddReactionToReplyResponse {
  data: {
    reply: UpdatedFieldsInReply;
  };
}
export const addReactionToReply = ({
  replyId,
  type,
}: AddReactionToReplyOptions) => {
  return api.post<AddReactionToReplyResponse>(`/replies/${replyId}/reactions`, {
    type,
  });
};

interface RemoveReactionFromReplyOptions {
  replyId: string;
}
export interface RemoveReactionFromReplyResponse {
  data: {
    reply: UpdatedFieldsInReply;
  };
}
export const removeReactionFromReply = ({
  replyId,
}: RemoveReactionFromReplyOptions) => {
  return api.delete<RemoveReactionFromReplyResponse>(
    `/comments/${replyId}/reactions`
  );
};
