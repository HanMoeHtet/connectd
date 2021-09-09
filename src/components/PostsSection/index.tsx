import { Box, CircularProgress, Divider } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { fetchNewsfeedPosts } from 'src/services/newsfeed';
import { useAppDispatch, useAppSelector } from 'src/store';
import { setPosts } from 'src/store/posts';
import { PostType } from 'src/types/post';
import NewPostSection from './NewPostSection';
import PostComponent from './Post';
import Share from './Share';

const PostsSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const { posts } = useAppSelector((state) => state.postsStore);

  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(10);
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    setIsLoading(true);

    const response = await fetchNewsfeedPosts({ skip, limit });
    const { posts: newPosts } = response.data.data;

    if (newPosts.length !== 0) {
      dispatch(setPosts([...posts, ...newPosts]));
      setSkip((prev) => prev + limit);

      setIsLoading(false);
    }
  }, [skip, limit, dispatch, posts]);

  useEffect(() => {
    dispatch(setPosts([]));
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(
        async (entries) => {
          const firstEntry = entries[0];
          if (firstEntry && firstEntry.isIntersecting && !isLoading) {
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
  }, [loadMore, isLoading, limit, posts]);

  return (
    <Box width="512px" margin="auto" padding="15px 0">
      <NewPostSection />
      <Divider style={{ margin: '15px auto', width: '80px' }} />
      {posts.map((post) =>
        post.type === PostType.POST ? (
          <PostComponent {...post} key={post._id} />
        ) : (
          <Share {...post} key={post._id} />
        )
      )}
      <Box display="flex" justifyContent="center">
        <CircularProgress color="primary" ref={loadMoreRef} />
      </Box>
    </Box>
  );
};

export default PostsSection;
