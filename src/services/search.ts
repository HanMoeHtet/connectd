import api from './api';
import { Post } from 'src/types/post';

interface SearchOptions {
  q: string;
}

export interface SearchResult {
  users: User[];
  posts: Post[];
}

export interface User {
  _id: string;
  username: string;
  avatar?: string;
  isAuthUser: boolean;
  areUsersFriends?: boolean;
}

interface SearchResponse {
  data: SearchResult;
}

export const search = ({ q }: SearchOptions) => {
  return api.get<SearchResponse>(`/search?q=${q}`);
};
