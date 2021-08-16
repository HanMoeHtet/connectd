import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { formatDistance } from 'date-fns';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Reply as ReplyType } from 'src/services/reply';
import ReactInReplyButton from './ReactInReplyButton';
import ReactionsInReplyButton from './ReactionsInReplyButton';

const useStyles = makeStyles((theme) => ({
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
  },
}));

interface ReplyProps extends ReplyType {
  postId: string;
}

const Reply: React.FC<ReplyProps> = ({
  _id,
  commentId,
  postId,
  content,
  createdAt,
  reactionCounts,
  user,
  userId,
  userReactedReactionType,
}) => {
  const classes = useStyles();

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
            <ReactionsInReplyButton
              replyId={_id}
              commentId={commentId}
              postId={postId}
              counts={reactionCounts}
            />
            <ReactInReplyButton
              replyId={_id}
              commentId={commentId}
              postId={postId}
              userReactedReactionType={userReactedReactionType}
            />
          </CardActions>
        </Box>
      </Box>
    </CardContent>
  );
};

export default Reply;
