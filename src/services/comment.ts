import { BasicProfile } from 'src/types/lib';
import { Media, ReactionType, UpdatedFieldsInPost } from 'src/types/post';
import { getFormData } from 'src/utils/formData';
import api from './api';
import { Reply } from './reply';

interface FetchCommentsInPostOptions {
  postId: string;
  limit: number;
  lastCommentId?: string;
}
export interface Comment {
  _id: string;
  postId: string;
  userId: string;
  content: string;
  media?: Media;
  reactionCounts: {
    [key in ReactionType]: number;
  };
  userReactedReactionType: ReactionType;
  replyCount: number;
  replies?: Reply[];
  user: BasicProfile;
  createdAt: Date;
}
export interface FetchCommentsInPostResponse {
  data: {
    comments: Comment[];
    post: UpdatedFieldsInPost;
  };
}
export const fetchCommentsInPost = ({
  postId,
  limit,
  lastCommentId,
}: FetchCommentsInPostOptions) => {
  return api.get<FetchCommentsInPostResponse>(
    `/posts/${postId}/comments?lastCommentId=${
      lastCommentId || ''
    }&limit=${limit}`
  );
};

export interface CreateCommentFormData {
  content: string;
  media?: File;
}

export interface CreateCommentSuccessResponse {
  data: {
    comment: Comment;
    post: UpdatedFieldsInPost;
  };
}

export interface CreateCommentError {
  content?: string[];
  postId?: string[];
}

interface CreateCommentPayload extends CreateCommentFormData {}
export const createComment = (
  postId: string,
  payload: CreateCommentPayload
) => {
  const formData = getFormData(payload);
  return api.post<CreateCommentSuccessResponse>(
    `/posts/${postId}/comments`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
