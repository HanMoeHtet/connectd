import { Box } from '@material-ui/core';
import React from 'react';
import CommentComponent from './Comment';

const Comments: React.FC = () => {
  return (
    <Box>
      <CommentComponent />
      <CommentComponent />
      <CommentComponent />
    </Box>
  );
};

export default Comments;
