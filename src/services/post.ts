import { BasicProfile } from 'src/types/lib';
import { Privacy, ReactionType } from 'src/types/post';
import api from './api';

interface FetchReactionsInPostOptions {
  postId: string;
  limit: number;
  skip: number;
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
    post: {
      _id: string;
      content: string;
      privacy: Privacy;
      reactionCounts: {
        [key in ReactionType]: number;
      };
      commentCount: number;
      shareCount: number;
    };
  };
}
export const fetchReactionsInPost = ({
  postId,
  limit,
  skip,
  reactionType,
}: FetchReactionsInPostOptions) => {
  return api.get<FetchReactionsInPostResponse>(
    `/posts/${postId}/reactions?skip=${skip}&limit=${limit}&reactionType=${reactionType}`
  );
};
