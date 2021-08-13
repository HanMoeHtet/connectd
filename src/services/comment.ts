import { BasicProfile } from 'src/types/lib';
import { ReactionType, UpdatedFieldsInPost } from 'src/types/post';
import api from './api';

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
  reactionCounts: {
    [key in ReactionType]: number;
  };
  userReactedReactionType: ReactionType;
  replyCount: number;
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
