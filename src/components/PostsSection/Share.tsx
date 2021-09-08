import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Comment } from '@material-ui/icons';
import { formatDistance } from 'date-fns';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { selectIsUserOnline } from 'src/store/online-status';
import { Media, MediaType, SharedPost as PostType } from 'src/types/post';
import StyledBadge from '../StyledBadge';
import CommentsSection from './CommentsSection';
import ReactInPostButton from './ReactInPostButton';
import ReactionsInPostButton from './ReactionsInPostButton';
import ShareButton from './ShareButton';
import { privacyIcons } from './shared';
import SourcePost from './SourcePost';

const useStyles = makeStyles((theme) => ({
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
  },
}));

type PostProps = PostType & {};

const Post: React.FC<PostProps> = React.memo(
  ({
    _id,
    userId,
    type,
    createdAt,
    privacy,
    content,
    reactionCounts,
    commentCount,
    shareCount,
    media,
    source,
    user,
    userReactedReactionType,
  }) => {
    const classes = useStyles();

    const [isShowingComments, setIsShowingComments] = React.useState(false);

    const isUserOnline = useAppSelector(selectIsUserOnline(userId));

    const PrivacyIcon = privacyIcons.get(privacy)!.Icon;

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
      <>
        <Card>
          <CardHeader
            avatar={
              <Link
                to={`/users/${userId}`}
                component={RouterLink}
                underline="none"
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  variant="dot"
                  invisible={!isUserOnline}
                >
                  <Avatar src={user.avatar}>
                    {(user.username[0] || '').toUpperCase()}
                  </Avatar>
                </StyledBadge>
              </Link>
            }
            title={
              <Link
                to={`/users/${userId}`}
                component={RouterLink}
                className={`${classes.author}`}
              >
                <span>{user.username}</span>
              </Link>
            }
            subheader={
              <Box display="flex" alignItems="center">
                <Link
                  to={`/posts/${_id}`}
                  component={RouterLink}
                  color="textSecondary"
                >
                  <Typography variant="body2" color="textSecondary">
                    {formatDistance(new Date(createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </Typography>
                </Link>
                <Box width="10px"></Box>
                <PrivacyIcon fontSize="small" />
              </Box>
            }
          />
          <CardContent style={{ paddingTop: 0, paddingBottom: 5 }}>
            <Typography style={{ whiteSpace: 'pre-wrap' }}>
              {content}
            </Typography>
          </CardContent>
          {media && renderMedia(media)}
          <SourcePost {...source} />
          <Divider style={{ margin: '0 15px', marginTop: 10 }} />
          <CardActions>
            {Object.values(reactionCounts).reduce(
              (acc, curr) => acc + curr,
              0
            ) !== 0 && (
              <Box flexGrow="1" display="flex" justifyContent="center">
                <ReactionsInPostButton counts={reactionCounts} postId={_id} />
              </Box>
            )}
            <Box flexGrow="1" display="flex" justifyContent="center">
              <ReactInPostButton
                userReactedReactionType={userReactedReactionType}
                postId={_id}
              />
            </Box>
            <Box flexGrow="1" display="flex" justifyContent="center">
              <Button
                style={{ padding: '5px 10px' }}
                onClick={() => {
                  setIsShowingComments((old) => !old);
                }}
              >
                <Comment style={{ marginRight: 10 }} />
                <Typography>{commentCount}</Typography>
              </Button>
            </Box>
            <Box flexGrow="1" display="flex" justifyContent="center">
              <ShareButton postId={_id} count={shareCount} />
            </Box>
          </CardActions>
          <Collapse in={isShowingComments} timeout={500}>
            <Divider style={{ margin: '0 15px' }} />
            <CommentsSection
              postId={_id}
              isShowingComments={isShowingComments}
            />
            <Box height="10px" />
          </Collapse>
        </Card>
        <Box height="10px" />
      </>
    );
  }
);

export default Post;
