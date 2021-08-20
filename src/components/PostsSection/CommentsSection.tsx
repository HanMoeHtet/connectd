import React, { useEffect, useCallback } from 'react';
import CommentEditor from './CommentEditor';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { fetchCommentsInPost } from 'src/services/comment';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectComments, setComments, updatePost } from 'src/store/posts';
import Comment from './Comment';

const MAX_COMMENTS_PER_REQUEST = 10;

interface CommentsSectionProps {
  postId: string;
  isShowingComments: boolean;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  postId,
  isShowingComments,
}) => {
  const dispatch = useAppDispatch();

  const [limit] = React.useState(MAX_COMMENTS_PER_REQUEST);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const comments = useAppSelector(selectComments(postId));

  const loadMore = useCallback(async () => {
    setIsLoading(true);
    const response = await fetchCommentsInPost({
      lastCommentId: comments[comments.length - 1]?._id,
      limit,
      postId,
    });
    const { comments: newComments, post } = response.data.data;

    dispatch(setComments({ postId, comments: [...comments, ...newComments] }));
    dispatch(updatePost(postId, post));
    setIsLoading(false);
  }, [comments, dispatch, limit, postId]);

  useEffect(() => {
    (async () => {
      if (isShowingComments && !hasLoaded) {
        await loadMore();
        setHasLoaded(true);
      }
    })();
  }, [isShowingComments, loadMore, hasLoaded]);

  return (
    <>
      <CommentEditor postId={postId} />
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
      {comments.length >= MAX_COMMENTS_PER_REQUEST && (
        <CommentEditor postId={postId} />
      )}
    </>
  );
};

export default CommentsSection;
