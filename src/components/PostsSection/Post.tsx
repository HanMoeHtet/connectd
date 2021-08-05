import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Comment, Public } from '@material-ui/icons';
import { formatDistance } from 'date-fns';
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import avatarImg from 'src/assets/images/avatar2.png';
import CommentEditor from './CommentEditor';
import Comments from './Comments';
import ReactButton from './ReactButton';
import ReactionsButton from './ReactionsButton';
import ShareButton from './ShareButton';
import { Post as PostType } from 'src/types/post';
import { fetchUserBasicProfile } from 'src/services/user';
import { BasicProfile } from 'src/types/lib';

const useStyles = makeStyles((theme) => ({
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
  },
}));

type PostProps = PostType & {
  onPostLoaded: () => void;
};

const Post: React.FC<PostProps> = React.memo(
  ({
    userId,
    type,
    createdAt,
    privacy,
    content,
    reactionIds,
    commentIds,
    shareIds,
    onPostLoaded,
  }) => {
    const classes = useStyles();

    const [isShowingComments, setIsShowingComments] = React.useState(false);
    const [user, setUser] = React.useState<BasicProfile | null>(null);

    useEffect(
      () => {
        (async () => {
          const response = await fetchUserBasicProfile(userId);
          const { user } = response.data.data;
          setUser(user);
          onPostLoaded();
        })();
      }, // eslint-disable-next-line react-hooks/exhaustive-deps
      [userId]
    );

    if (!user) {
      return null;
    }

    return (
      <>
        <Card>
          <CardHeader
            avatar={
              <Link to="/" component={RouterLink}>
                <Avatar src={user.avatar}>
                  {user.username[0].toUpperCase()}
                </Avatar>
              </Link>
            }
            title={
              <Link
                to="/"
                component={RouterLink}
                className={`${classes.author}`}
              >
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
                <Public fontSize="small" />
              </Box>
            }
          />
          <CardContent style={{ paddingTop: 0, paddingBottom: 5 }}>
            <Typography>{content}</Typography>
          </CardContent>
          {/* <CardMedia image={avatarImg} component="img" /> */}
          <Divider style={{ margin: '0 15px', marginTop: 10 }} />
          <CardActions>
            <Box flexGrow="1" display="flex" justifyContent="center">
              <ReactionsButton reactionIds={reactionIds} />
            </Box>
            <Box flexGrow="1" display="flex" justifyContent="center">
              <ReactButton />
            </Box>
            <Box flexGrow="1" display="flex" justifyContent="center">
              <Button
                style={{ padding: '5px 10px' }}
                onClick={() => setIsShowingComments((old) => !old)}
              >
                <Comment style={{ marginRight: 10 }} />
                <Typography>{commentIds.length}</Typography>
              </Button>
            </Box>
            <Box flexGrow="1" display="flex" justifyContent="center">
              <ShareButton shareIds={shareIds} />
            </Box>
          </CardActions>
          <Collapse in={isShowingComments} timeout="auto">
            <Divider style={{ margin: '0 15px' }} />
            <CommentEditor />
            <Comments />
          </Collapse>
        </Card>
        <Box height="10px" />
      </>
    );
  }
);

export default Post;
