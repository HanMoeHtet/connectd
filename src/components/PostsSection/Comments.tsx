import { Box, Button, CircularProgress } from '@material-ui/core';
import React, { useCallback } from 'react';
import {
  fetchCommentsInPost,
  Comment as CommentType,
} from 'src/services/comment';
import { useAppDispatch } from 'src/store';
import { updatePost } from 'src/store/posts';
import Comment from './Comment';

const MAX_COMMENTS_PER_REQUEST = 10;

interface CommentsProps {
  postId: string;
}
const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const dispatch = useAppDispatch();

  const [limit, setLimit] = React.useState(MAX_COMMENTS_PER_REQUEST);
  const [isLoading, setIsLoading] = React.useState(false);
  const [comments, setComments] = React.useState<CommentType[]>([]);

  const loadMore = async () => {
    setIsLoading(true);
    const response = await fetchCommentsInPost({
      lastCommentId: comments[comments.length - 1]?._id,
      limit,
      postId,
    });
    const { comments: newComments, post } = response.data.data;

    setComments([...comments, ...newComments]);
    dispatch(updatePost(postId, post));
    setIsLoading(false);
  };

  return (
    <Box>
      {comments.map((comment) => (
        <Comment {...comment} key={comment._id} />
      ))}
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
