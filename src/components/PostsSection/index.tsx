import { Box, Divider } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { fetchNewsfeedPosts } from 'src/services/newsfeed';
import { fetchUserBasicProfile } from 'src/services/user';
import { BasicProfile } from 'src/types/lib';
import { Post } from 'src/types/post';
import NewPostSection from './NewPostSection';
import PostComponent from './Post';
import { CircularProgress } from '@material-ui/core';

const PostsSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<(Post & { user: BasicProfile })[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    const response = await fetchNewsfeedPosts({ skip, limit });
    const { posts: newPosts } = response.data.data;

    const newPostsWithUsers = await Promise.all(
      newPosts.map(async (post): Promise<Post & { user: BasicProfile }> => {
        const { user } = (await fetchUserBasicProfile(post.userId)).data.data;
        return { ...post, user };
      })
    );

    setPosts((prev) => [...prev, ...newPostsWithUsers]);
    setSkip((prev) => prev + limit);
  }, [skip, limit]);

  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(
        async (entries) => {
          const firstEntry = entries[0];
          if (firstEntry.isIntersecting && !isLoading) {
            setIsLoading(true);
            await loadMore();
            setIsLoading(false);
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
      {posts.map((post) => (
        <PostComponent {...post} key={post.id} />
      ))}
      <Box display="flex" justifyContent="center">
        <CircularProgress color="primary" ref={loadMoreRef} />
      </Box>
    </Box>
  );
};

export default PostsSection;
