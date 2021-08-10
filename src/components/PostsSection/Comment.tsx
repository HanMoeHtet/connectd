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
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import avatarImg from 'src/assets/images/avatar2.png';
import CommentEditor from './CommentEditor';
import ReactButton from './ReactButton';
import ReactionsButton from './ReactionsButton';
import RepliesButton from './RepliesButton';
import Reply from './Reply';

const useStyles = makeStyles((theme) => ({
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
  },
}));

const Comment: React.FC = () => {
  const classes = useStyles();

  const [isShowingReplies, setIsShowingReplies] = useState(false);

  return (
    <CardContent>
      <Box display="flex">
        <Link to="/" component={RouterLink}>
          <Avatar src={avatarImg} />
        </Link>
        <Box>
          <CardContent style={{ paddingTop: 0, paddingBottom: 10 }}>
            <Link to="/" component={RouterLink} className={classes.author}>
              <span>Han Moe Htet</span>
            </Link>
            <Typography variant="body2" color="textSecondary">
              a few minutes ago
            </Typography>
          </CardContent>
          <CardContent style={{ paddingTop: 0, paddingBottom: 5 }}>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              quaerat, inventore dignissimos fugiat pariatur consequatur,
              distinctio vel autem quia blanditiis officiis asperiores illo,
              officia ea expedita iure a? Voluptatem, doloremque.
            </Typography>
          </CardContent>
          <CardActions>
            {/* <ReactionsButton /> */}
            {/* <ReactButton /> */}
            <RepliesButton
              onClick={() => {
                console.log('clicked');
                setIsShowingReplies((prev) => !prev);
              }}
            />
          </CardActions>
          <Collapse in={isShowingReplies} timeout="auto">
            <Reply />
            <CommentEditor />
          </Collapse>
        </Box>
      </Box>
    </CardContent>
  );
};

export default Comment;
