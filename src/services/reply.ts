import { BasicProfile } from 'src/types/lib';
import { Media, ReactionType, UpdatedFieldsInComment } from 'src/types/post';
import { getFormData } from 'src/utils/formData';
import api from './api';

interface FetchRepliesInCommentOptions {
  commentId: string;
  limit: number;
  lastReplyId?: string;
}
export interface Reply {
  _id: string;
  commentId: string;
  userId: string;
  content: string;
  media: Media;
  reactionCounts: {
    [key in ReactionType]: number;
  };
  userReactedReactionType: ReactionType;
  user: BasicProfile;
  createdAt: Date;
}
export interface FetchRepliesInCommentResponse {
  data: {
    replies: Reply[];
    comment: UpdatedFieldsInComment;
  };
}
export const fetchRepliesInComment = ({
  commentId,
  limit,
  lastReplyId,
}: FetchRepliesInCommentOptions) => {
  return api.get<FetchRepliesInCommentResponse>(
    `/comments/${commentId}/replies?lastReplyId=${
      lastReplyId || ''
    }&limit=${limit}`
  );
};

export interface CreateReplyFormData {
  content: string;
  media?: File;
}

export interface CreateReplySuccessResponse {
  data: {
    reply: Reply;
    comment: UpdatedFieldsInComment;
  };
}

export interface CreateReplyError {
  content?: string[];
  replyId?: string[];
}

interface CreateReplyPayload extends CreateReplyFormData {}
export const createReply = (replyId: string, payload: CreateReplyPayload) => {
  const formData = getFormData(payload);
  return api.post<CreateReplySuccessResponse>(
    `/comments/${replyId}/replies`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
