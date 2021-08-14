import { CreatePostFormData, CreatePostSuccessResponse } from 'src/types/lib';
import api from './api';

interface CreatePostPayload extends CreatePostFormData {}
export const createPost = (payload: CreatePostPayload) => {
  return api.post<CreatePostSuccessResponse>('/posts', payload);
};
