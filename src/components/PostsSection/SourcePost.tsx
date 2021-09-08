import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { formatDistance } from 'date-fns';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { selectIsUserOnline } from 'src/store/online-status';
import { Media, MediaType, Source as PostType } from 'src/types/post';
import StyledBadge from '../StyledBadge';
import { privacyIcons } from './shared';

const useStyles = makeStyles((theme) => ({
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
  },
}));

type PostProps = PostType & {};

const Post: React.FC<PostProps> = React.memo(
  ({ _id, userId, type, createdAt, privacy, content, user, media }) => {
    const classes = useStyles();

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
      <Box style={{ border: '1px solid #5f5f5f', margin: 'auto 8px' }}>
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
          style={{
            paddingRight: 8,
            paddingLeft: 8,
          }}
        />
        <CardContent style={{ padding: '0px 8px 5px 8px' }}>
          <Typography style={{ whiteSpace: 'pre-wrap' }}>{content}</Typography>
        </CardContent>
        {media && renderMedia(media)}
      </Box>
    );
  }
);

export default Post;
