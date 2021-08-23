import {
  CreatePostFormData,
  CreatePostSuccessResponse,
  CreateShareFormData,
  CreateShareSuccessResponse,
} from 'src/types/lib';
import { Post } from 'src/types/post';
import { getFormData } from 'src/utils/formData';
import api from './api';

interface CreatePostPayload extends CreatePostFormData {}
export const createPost = (payload: CreatePostPayload) => {
  const formData = getFormData(payload);
  return api.post<CreatePostSuccessResponse>('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const createShare = (postId: string, payload: CreateShareFormData) => {
  return api.post<CreateShareSuccessResponse>(
    `/posts/${postId}/shares`,
    payload
  );
};

export interface GetPostSuccessResponse {
  data: {
    post: Post;
  };
}
export const getPost = (postId: string) => {
  return api.get<GetPostSuccessResponse>(`/posts/${postId}`);
};

interface GetPostsByUserOptions {
  userId: string;
  lastPostId?: string;
  limit: number;
}

interface GetPostsByUserSuccessResponse {
  data: {
    posts: Post[];
    hasMore: boolean;
  };
}

export const getPostsByUser = ({
  userId,
  lastPostId,
  limit,
}: GetPostsByUserOptions) => {
  return api.get<GetPostsByUserSuccessResponse>(
    `/users/${userId}/posts?lastPostId=${lastPostId || ''}&limit=${limit}`
  );
};
