import { Post } from 'src/types/post';
import api from './api';

interface FetchNewsfeedPostsQuery {
  skip: number;
  limit: number;
}

export const fetchNewsfeedPosts = ({
  skip,
  limit,
}: FetchNewsfeedPostsQuery) => {
  return api.get<{ data: { posts: Post[] } }>(
    `/newsfeed/posts?skip=${skip}&limit=${limit}`
  );
};
