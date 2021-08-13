import { Comment } from 'src/services/comment';
import { BasicProfile } from './lib';

export enum Privacy {
  PUBLIC = 'PUBLIC',
  FRIENDS = 'FRIENDS',
  ONLY_ME = 'ONLY_ME',
}

export enum PostType {
  POST = 'POST',
  SHARE = 'SHARE',
}

export interface BasePost {
  _id: string;
  userId: string;
  user: BasicProfile;
  createdAt: Date;
  privacy: Privacy;
  content: string;
  reactionCounts: {
    [key in ReactionType]: number;
  };
  commentCount: number;
  comments?: Comment[];
  shareCount: number;
  userReactedReactionType?: ReactionType;
}

export interface NormalPost extends BasePost {
  type: PostType.POST;
}

export interface SharedPost extends BasePost {
  type: PostType.SHARE;
  sourceId: string;
}

export type Post = NormalPost | SharedPost;

export enum ReactionType {
  LIKE = 'LIKE',
  FAVORITE = 'FAVORITE',
  SATISFIED = 'SATISFIED',
  DISSATISFIED = 'DISSATISFIED',
}

export interface UpdatedFieldsInPost {
  privacy?: Privacy;
  content?: string;
  reactionCounts?: {
    [key in ReactionType]: number;
  };
  commentCount?: number;
  shareCount?: number;
  userReactedReactionType?: ReactionType;
}

export enum ReactionSourceType {
  POST = 'Post',
  COMMENT = 'Comment',
}

export interface UpdatedFieldsInComment {
  content?: string;
  reactionCounts?: {
    [key in ReactionType]: number;
  };
  replyCount?: number;
  userReactedReactionType?: ReactionType;
}
