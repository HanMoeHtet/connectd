import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import avatarImg from 'src/assets/images/avatar2.png';
import { ThumbUp, Comment, Share } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
  },
}));

const Post: React.FC = () => {
  const classes = useStyles();

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
        subheader="September 14, 2016"
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
      <CardActions>
        <Box flexGrow="1" display="flex" justifyContent="center">
          <Button style={{ padding: '5px 10px' }}>
            <ThumbUp style={{ marginRight: 10 }} />
            <Typography>300</Typography>
          </Button>
        </Box>
        <Box flexGrow="1" display="flex" justifyContent="center">
          <Button style={{ padding: '5px 10px' }}>
            <Comment style={{ marginRight: 10 }} />
            <Typography>300</Typography>
          </Button>
        </Box>
        <Box flexGrow="1" display="flex" justifyContent="center">
          <Button style={{ padding: '5px 10px' }}>
            <Share style={{ marginRight: 10 }} />
            <Typography>300</Typography>
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Post;
