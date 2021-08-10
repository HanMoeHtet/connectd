import { Box, Button, CircularProgress } from '@material-ui/core';
import React, { useCallback } from 'react';
import CommentComponent from './Comment';

const MAX_COMMENTS_PER_REQUEST = 10;

const Comments: React.FC = () => {
  const [skip, setSkip] = React.useState(0);
  const [limit, setLimit] = React.useState(MAX_COMMENTS_PER_REQUEST);
  const [isLoading, setIsLoading] = React.useState(false);

  const loadMore = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // const response = await fetchNewsfeedPosts({ skip, limit });
    // const { posts: newPosts } = response.data.data;

    // if (newPosts.length !== 0) {
    //   dispatch(setPosts([...posts, ...newPosts]));
    //   setSkip((prev) => prev + limit);

    //   setIsLoading(false);
    // }
  };

  return (
    <Box>
      <CommentComponent />
      <CommentComponent />
      <CommentComponent />
      <Box display="flex" justifyContent="center">
        {isLoading ? (
          <CircularProgress color="primary" />
        ) : (
          <Button onClick={loadMore}>Load more</Button>
        )}
      </Box>
    </Box>
  );
};

export default Comments;
