import { Box, CircularProgress } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { getPostsByUser } from 'src/services/post';
import { useAppDispatch, useAppSelector } from 'src/store';
import { setPosts } from 'src/store/posts';
import { PostType } from 'src/types/post';
import PostComponent from 'src/components/PostsSection/Post';
import Share from 'src/components/PostsSection/Share';

interface PostsProps {
  userId: string;
}

const Posts: React.FC<PostsProps> = ({ userId }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [limit] = useState(10);
  const loadMoreRef = React.useRef<HTMLDivElement>(null);
  const { posts } = useAppSelector((state) => state.postsStore);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    setIsLoading(true);
    const response = await getPostsByUser({
      userId,
      lastPostId: posts[posts.length - 1]?._id,
      limit,
    });
    const { posts: newPosts, hasMore } = response.data.data;
    dispatch(setPosts([...posts, ...newPosts]));
    setHasMore(hasMore);
    setIsLoading(false);
  }, [limit, dispatch, posts, userId]);

  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(
        async (entries) => {
          const firstEntry = entries[0];
          if (firstEntry.isIntersecting && !isLoading) {
            await loadMore();
          }
        },
        // FIXME: check if network is wifi or not and set the threshold accordingly
        { rootMargin: '1000px' }
      );

      if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [isLoading, loadMore]);

  return (
    <>
      {posts.map((post) =>
        post.type === PostType.POST ? (
          <PostComponent {...post} key={post._id} />
        ) : (
          <Share {...post} key={post._id} />
        )
      )}
      {hasMore && (
        <Box display="flex" justifyContent="center" overflow="hidden">
          <CircularProgress color="primary" ref={loadMoreRef} />
        </Box>
      )}
    </>
  );
};

export default Posts;
