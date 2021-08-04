import { Box, Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { fetchNewsfeedPosts } from 'src/services/newsfeed';
import { Post as PostType } from 'src/types/post';
import NewPostSection from './NewPostSection';
import Post from './Post';

const PostsSection: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    (async () => {
      const response = await fetchNewsfeedPosts({ skip, limit });
      const { posts } = response.data.data;
      setPosts(posts);
      setSkip(skip + limit);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box width="512px" margin="auto" padding="15px 0">
      <NewPostSection />
      <Divider style={{ margin: '15px auto', width: '80px' }} />
      {posts.map((post) => (
        <Post {...post} key={post.id} />
      ))}
    </Box>
  );
};

export default PostsSection;
