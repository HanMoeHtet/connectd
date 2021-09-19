import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Link,
  makeStyles,
} from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import * as React from 'react';
import { createFriendRequest } from 'src/services/friend';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
  },
}));

interface UserProps {
  user: {
    _id: string;
    username: string;
    avatar?: string;
    friendId?: string;
    isAuthUser: boolean;
  };
}
const User: React.FC<UserProps> = ({ user }) => {
  const classes = useStyles();

  const handleClick = async (userId: string) => {
    await createFriendRequest({ userId });
  };

  const { _id, username, avatar, friendId, isAuthUser } = user;

  return (
    <ListItem>
      <ListItemAvatar>
        <Link to={`/users/${_id}`} component={RouterLink} underline="none">
          <Avatar src={avatar}>{(username[0] || '').toUpperCase()}</Avatar>
        </Link>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Link
            to={`/users/${_id}`}
            component={RouterLink}
            className={`${classes.author}`}
          >
            <span>{user.username}</span>
          </Link>
        }
      />
      {!isAuthUser && friendId === undefined && (
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="add friend"
            onClick={() => handleClick(_id)}
          >
            <PersonAdd />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default User;
