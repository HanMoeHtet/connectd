import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { formatDistance } from 'date-fns';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Reply as ReplyType } from 'src/services/reply';
import { Media, MediaType } from 'src/types/post';
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
  media,
  createdAt,
  reactionCounts,
  user,
  userReactedReactionType,
}) => {
  const classes = useStyles();

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
          <Avatar src={user.avatar}>
            {(user.username[0] || '').toUpperCase()}
          </Avatar>
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
