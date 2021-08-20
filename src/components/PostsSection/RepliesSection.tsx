import { Box, Button, CircularProgress } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { fetchRepliesInComment } from 'src/services/reply';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectReplies, setReplies, updateComment } from 'src/store/posts';
import Reply from './Reply';
import ReplyEditor from './ReplyEditor';

const MAX_REPLIES_PER_REQUEST = 10;

interface RepliesSectionProps {
  commentId: string;
  postId: string;
  isShowingReplies: boolean;
}

const RepliesSection: React.FC<RepliesSectionProps> = ({
  commentId,
  postId,
  isShowingReplies,
}) => {
  const dispatch = useAppDispatch();

  const [limit] = React.useState(MAX_REPLIES_PER_REQUEST);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const replies = useAppSelector(selectReplies(commentId, postId));

  const loadMore = useCallback(async () => {
    setIsLoading(true);
    const response = await fetchRepliesInComment({
      lastReplyId: replies[replies.length - 1]?._id,
      limit,
      commentId,
    });
    const { replies: newReplies, comment } = response.data.data;

    dispatch(
      setReplies({ commentId, postId, replies: [...replies, ...newReplies] })
    );
    dispatch(updateComment(commentId, postId, comment));
    setIsLoading(false);
  }, [replies, dispatch, limit, postId, commentId]);

  useEffect(() => {
    (async () => {
      if (isShowingReplies && !hasLoaded) {
        await loadMore();
        setHasLoaded(true);
      }
    })();
  }, [isShowingReplies, loadMore, hasLoaded]);

  return (
    <>
      {replies.map((reply) => (
        <Reply postId={postId} {...reply} key={reply._id} />
      ))}
      <Box display="flex" justifyContent="center">
        {isLoading ? (
          <CircularProgress color="primary" />
        ) : (
          <Button onClick={loadMore}>Load more</Button>
        )}
      </Box>
      <ReplyEditor commentId={commentId} postId={postId} />
    </>
  );
};

export default RepliesSection;
