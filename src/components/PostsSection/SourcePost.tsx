import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { formatDistance } from 'date-fns';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Source as PostType } from 'src/types/post';
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
  ({ _id, userId, type, createdAt, privacy, content, user }) => {
    const classes = useStyles();

    const PrivacyIcon = privacyIcons.get(privacy)!.Icon;

    return (
      <Box style={{ border: '1px solid #5f5f5f', margin: 'auto 8px' }}>
        <CardHeader
          avatar={
            <Link to="/" component={RouterLink}>
              <Avatar src={user.avatar}>
                {(user.username[0] || '').toUpperCase()}
              </Avatar>
            </Link>
          }
          title={
            <Link to="/" component={RouterLink} className={`${classes.author}`}>
              <span>{user.username}</span>
            </Link>
          }
          subheader={
            <Box display="flex" alignItems="center">
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginRight: 10 }}
              >
                {formatDistance(new Date(createdAt), new Date(), {
                  addSuffix: true,
                })}
              </Typography>
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
        {/* <CardMedia image={avatarImg} component="img" /> */}
      </Box>
    );
  }
);

export default Post;
