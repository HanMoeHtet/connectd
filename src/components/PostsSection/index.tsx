import { Box, Divider } from '@material-ui/core';
import React from 'react';
import NewPostSection from './NewPostSection';
import Post from './Post';

const PostsSection: React.FC = () => {
  return (
    <Box width="512px" margin="auto" padding="15px 0">
      <NewPostSection />
      <Divider style={{ margin: '15px auto', width: '80px' }} />
      <Post />
    </Box>
  );
};

export default PostsSection;
