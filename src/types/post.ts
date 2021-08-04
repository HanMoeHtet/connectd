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
  id: string;
  userId: string;
  createdAt: Date;
  privacy: Privacy;
  content: string;
  reactionIds: string[];
  commentIds: string[];
  /**
   * Store shared post ids
   */
  shareIds: string[];
}

export interface NormalPost extends BasePost {
  type: PostType.POST;
}

export interface SharedPost extends BasePost {
  type: PostType.SHARE;
  sourceId: string;
}

export type Post = NormalPost | SharedPost;
