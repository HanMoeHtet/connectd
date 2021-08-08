import { Box, CircularProgress, Divider } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { fetchNewsfeedPosts } from 'src/services/newsfeed';
import { Post, UpdatedFieldsInPost } from 'src/types/post';
import NewPostSection from './NewPostSection';
import PostComponent from './Post';

const PostsSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    setIsLoading(true);

    const response = await fetchNewsfeedPosts({ skip, limit });
    const { posts: newPosts } = response.data.data;

    if (newPosts.length !== 0) {
      setPosts((prev) => [...prev, ...newPosts]);
      setSkip((prev) => prev + limit);

      setIsLoading(false);
    }
  }, [skip, limit]);

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
  }, [loadMore, isLoading, limit, posts]);

  const onUpdate = useCallback(
    (updatedPostId: string, updatedFieldsInPost: UpdatedFieldsInPost) =>
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === updatedPostId) {
            return { ...post, ...updatedFieldsInPost };
          }
          return post;
        })
      ),
    []
  );

  return (
    <Box width="512px" margin="auto" padding="15px 0">
      <NewPostSection />
      <Divider style={{ margin: '15px auto', width: '80px' }} />
      {posts.map((post) => (
        <PostComponent {...post} key={post.id} onUpdate={onUpdate} />
      ))}
      <Box display="flex" justifyContent="center">
        <CircularProgress color="primary" ref={loadMoreRef} />
      </Box>
    </Box>
  );
};

export default PostsSection;
