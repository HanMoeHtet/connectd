import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import avatarImg from 'src/assets/images/avatar2.png';
import ReactButton from './ReactButton';
import ReactionsButton from './ReactionsButton';

const useStyles = makeStyles((theme) => ({
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
  },
}));

const Reply: React.FC = () => {
  const classes = useStyles();

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
            <ReactButton />
          </CardActions>
        </Box>
      </Box>
    </CardContent>
  );
};

export default Reply;
