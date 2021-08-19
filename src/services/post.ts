import {
  CreatePostFormData,
  CreatePostSuccessResponse,
  CreateShareFormData,
  CreateShareSuccessResponse,
} from 'src/types/lib';
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
