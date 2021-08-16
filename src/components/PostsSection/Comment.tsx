import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  Collapse,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { formatDistance } from 'date-fns';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Comment as CommentType } from 'src/services/comment';
import ReactInCommentButton from './ReactInCommentButton';
import ReactionsInCommentButton from './ReactionsInCommentButton';
import RepliesButton from './RepliesButton';
import RepliesSection from './RepliesSection';

const useStyles = makeStyles((theme) => ({
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
  },
}));

interface CommentProps extends CommentType {}

export const Comment: React.FC<CommentProps> = ({
  _id,
  postId,
  content,
  replyCount,
  reactionCounts,
  user,
  userId,
  userReactedReactionType,
  createdAt,
}) => {
  const classes = useStyles();

  const [isShowingReplies, setIsShowingReplies] = useState(false);

  return (
    <CardContent>
      <Box display="flex">
        <Link to="/" component={RouterLink}>
          <Avatar src={user.avatar}>{user.username[0].toUpperCase()}</Avatar>
        </Link>
        <Box>
          <CardContent style={{ paddingTop: 0, paddingBottom: 10 }}>
            <Link to="/" component={RouterLink} className={classes.author}>
              <span>{user.username}</span>
            </Link>
            <Typography variant="body2" color="textSecondary">
              {formatDistance(new Date(createdAt), new Date(), {
                addSuffix: true,
              })}
            </Typography>
          </CardContent>
          <CardContent style={{ paddingTop: 0, paddingBottom: 5 }}>
            <Typography style={{ whiteSpace: 'pre-wrap' }}>
              {content}
            </Typography>
          </CardContent>
          <CardActions>
            <ReactionsInCommentButton
              counts={reactionCounts}
              postId={postId}
              commentId={_id}
            />
            <ReactInCommentButton
              userReactedReactionType={userReactedReactionType}
              postId={postId}
              commentId={_id}
            />
            <RepliesButton
              replyCount={replyCount}
              onClick={() => {
                setIsShowingReplies((prev) => !prev);
              }}
            />
          </CardActions>
          <Collapse in={isShowingReplies} timeout="auto">
            <RepliesSection
              commentId={_id}
              postId={postId}
              isShowingReplies={isShowingReplies}
            />
          </Collapse>
        </Box>
      </Box>
    </CardContent>
  );
};

export default Comment;
