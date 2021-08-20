import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { formatDistance } from 'date-fns';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Comment as CommentType } from 'src/services/comment';
import { Media, MediaType } from 'src/types/post';
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
  media,
  replyCount,
  reactionCounts,
  user,
  userId,
  userReactedReactionType,
  createdAt,
}) => {
  const classes = useStyles();

  const [isShowingReplies, setIsShowingReplies] = useState(false);

  const renderMedia = (media: Media) => {
    if (media.type === MediaType.IMAGE) {
      return <CardMedia src={media.url} component="img" />;
    }

    if (media.type === MediaType.VIDEO) {
      return <CardMedia src={media.url} component="video" controls />;
    }

    return null;
  };

  return (
    <CardContent>
      <Box display="flex">
        <Link to="/" component={RouterLink}>
          <Avatar src={user.avatar}>{user.username[0].toUpperCase()}</Avatar>
        </Link>
        <Box flexGrow="1">
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
          {media && renderMedia(media)}
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
