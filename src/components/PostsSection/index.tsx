import { Box, Divider } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { fetchNewsfeedPosts } from 'src/services/newsfeed';
import { NormalPost, Post, PostType } from 'src/types/post';
import NewPostSection from './NewPostSection';
import PostComponent from './Post';

const PostsSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(new Set<string>());
  const [posts, setPosts] = useState<Post[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(3);
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    const response = await fetchNewsfeedPosts({ skip, limit });
    const { posts: newPosts } = response.data.data;

    setPosts((prev) => {
      console.log(prev);
      return [...prev, ...newPosts];
    });

    return newPosts.map((post) => post.id);
  }, [skip, limit]);

  const onPostLoaded = (postId: string) => {
    setLoadingPosts((prev) => {
      console.log(prev.delete(postId));
      return new Set(prev);
    });
  };

  useEffect(() => {
    console.log(isLoading, loadingPosts.size);
    if (!isLoading && loadingPosts.size === 0) {
      const observer = new IntersectionObserver(async (entries) => {
        const firstEntry = entries[0];
        if (
          firstEntry.isIntersecting &&
          !isLoading &&
          loadingPosts.size === 0
        ) {
          setIsLoading(true);
          const postIds = await loadMore();
          setSkip((prev) => prev + limit);
          setLoadingPosts(new Set(postIds));
          setIsLoading(false);
        }
      });

      if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [loadMore, isLoading, loadingPosts, limit]);

  return (
    <Box width="512px" margin="auto" padding="15px 0">
      <NewPostSection />
      <Divider style={{ margin: '15px auto', width: '80px' }} />
      {posts.map((post) => (
        <PostComponent
          {...post}
          key={post.id}
          onPostLoaded={() => onPostLoaded(post.id)}
        />
      ))}
      <div ref={loadMoreRef}></div>
    </Box>
  );
};

export default PostsSection;
