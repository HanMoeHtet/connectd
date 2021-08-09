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
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CommentEditor from './CommentEditor';
import Comments from './Comments';
import ReactButton from './ReactButton';
import ReactionsButton from './ReactionsButton';
import ShareButton from './ShareButton';
import { Post as PostType, UpdatedFieldsInPost } from 'src/types/post';
import { BasicProfile } from 'src/types/lib';
import { privacyIcons } from './shared';

const useStyles = makeStyles((theme) => ({
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
  },
}));

type PostProps = PostType & {
  onUpdate: (id: string, updatedPost: UpdatedFieldsInPost) => void;
};

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
    user,
    onUpdate,
  }) => {
    const classes = useStyles();

    const [isShowingComments, setIsShowingComments] = React.useState(false);

    const PrivacyIcon = privacyIcons.get(privacy)!.Icon;

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
                <PrivacyIcon fontSize="small" />
              </Box>
            }
          />
          <CardContent style={{ paddingTop: 0, paddingBottom: 5 }}>
            <Typography>{content}</Typography>
          </CardContent>
          {/* <CardMedia image={avatarImg} component="img" /> */}
          <Divider style={{ margin: '0 15px', marginTop: 10 }} />
          <CardActions>
            {Object.values(reactionCounts).reduce(
              (acc, curr) => acc + curr,
              0
            ) !== 0 && (
              <Box flexGrow="1" display="flex" justifyContent="center">
                <ReactionsButton
                  counts={reactionCounts}
                  postId={_id}
                  onUpdate={onUpdate}
                />
              </Box>
            )}
            <Box flexGrow="1" display="flex" justifyContent="center">
              <ReactButton />
            </Box>
            <Box flexGrow="1" display="flex" justifyContent="center">
              <Button
                style={{ padding: '5px 10px' }}
                onClick={() => setIsShowingComments((old) => !old)}
              >
                <Comment style={{ marginRight: 10 }} />
                <Typography>{commentCount}</Typography>
              </Button>
            </Box>
            <Box flexGrow="1" display="flex" justifyContent="center">
              <ShareButton count={shareCount} />
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
