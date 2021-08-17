import {
  CreatePostFormData,
  CreatePostSuccessResponse,
  CreateShareFormData,
  CreateShareSuccessResponse,
} from 'src/types/lib';
import api from './api';

interface CreatePostPayload extends CreatePostFormData {}
export const createPost = (payload: CreatePostPayload) => {
  return api.post<CreatePostSuccessResponse>('/posts', payload);
};

export const createShare = (postId: string, payload: CreateShareFormData) => {
  return api.post<CreateShareSuccessResponse>(
    `/posts/${postId}/shares`,
    payload
  );
};
