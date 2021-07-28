import { Box } from '@material-ui/core';
import React from 'react';
import NewPostSection from './NewPostSection';

const PostsSection: React.FC = () => {
  return (
    <Box width="75%" margin="auto" padding="15px 0">
      <NewPostSection />
    </Box>
  );
};

export default PostsSection;
