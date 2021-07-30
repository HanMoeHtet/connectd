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
import avatarImg from 'src/assets/images/avatar2.png';
import CommentEditor from './CommentEditor';
import Comments from './Comments';
import ReactButton from './ReactButton';
import ReactionsButton from './ReactionsButton';
import ShareButton from './ShareButton';

const useStyles = makeStyles((theme) => ({
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
  },
}));

const Post: React.FC = () => {
  const classes = useStyles();

  const [isShowingComments, setIsShowingComments] = React.useState(false);

  return (
    <Card>
      <CardHeader
        avatar={
          <Link to="/" component={RouterLink}>
            <Avatar src={avatarImg}>R</Avatar>
          </Link>
        }
        title={
          <Link to="/" component={RouterLink} className={`${classes.author}`}>
            <span>Han Moe Htet</span>
          </Link>
        }
        subheader={
          <Box display="flex" alignItems="center">
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginRight: 10 }}
            >
              {formatDistance(new Date(), new Date(), { addSuffix: true })}
            </Typography>
            <Public fontSize="small" />
          </Box>
        }
      />
      <CardContent style={{ paddingTop: 0, paddingBottom: 5 }}>
        <Typography>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem unde
          iusto, ducimus, consequuntur repellat ab pariatur corporis aliquam
          eveniet magnam temporibus iste ea accusamus. Odit, accusantium. Unde
          amet recusandae nesciunt.
        </Typography>
      </CardContent>
      {/* <CardMedia image={avatarImg} component="img" /> */}
      <Divider style={{ margin: '0 15px', marginTop: 10 }} />
      <CardActions>
        <Box flexGrow="1" display="flex" justifyContent="center">
          <ReactionsButton />
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
            <Typography>300</Typography>
          </Button>
        </Box>
        <Box flexGrow="1" display="flex" justifyContent="center">
          <ShareButton />
        </Box>
      </CardActions>
      <Collapse in={isShowingComments} timeout="auto">
        <Divider style={{ margin: '0 15px' }} />
        <CommentEditor />
        <Comments />
      </Collapse>
    </Card>
  );
};

export default Post;
