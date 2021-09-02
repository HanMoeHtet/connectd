import { Avatar, Box, Link, Typography, makeStyles } from '@material-ui/core';
import { formatDistance } from 'date-fns';
import React from 'react';
import { FriendRequestAcceptedData } from 'src/services/friend';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
  },
}));

interface FriendRequestAcceptedProps extends FriendRequestAcceptedData {}

const FriendRequestAccepted: React.FC<FriendRequestAcceptedProps> = ({
  _id,
  friendUser,
  createdAt,
  hasBeenRead,
}) => {
  const classes = useStyles();

  return (
    <>
      <Link
        to={`/users/${friendUser._id}`}
        component={RouterLink}
        underline="none"
      >
        <Avatar
          src={friendUser.avatar}
          style={{ marginRight: 10, alignSelf: 'flex-start' }}
        >
          {(friendUser.username[0] || '').toUpperCase()}
        </Avatar>
      </Link>
      <Box>
        <Typography>
          <Link
            to={`/users/${friendUser._id}`}
            component={RouterLink}
            className={`${classes.author}`}
          >
            {friendUser.username}
          </Link>{' '}
          accepted your friend request.
        </Typography>
        <Box height="5px" />
        <Typography variant="body2" color="textSecondary">
          {formatDistance(new Date(createdAt), new Date(), {
            addSuffix: true,
          })}
        </Typography>
      </Box>
    </>
  );
};

export default FriendRequestAccepted;
