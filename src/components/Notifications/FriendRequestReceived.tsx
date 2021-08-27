import {
  Avatar,
  Box,
  Button,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { formatDistance } from 'date-fns';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  acceptFriendRequest,
  FriendRequestReceivedData,
  rejectFriendRequest,
} from 'src/services/friend';
import { useAppDispatch } from 'src/store';
import { removeNotification } from 'src/store/notifications';

const useStyles = makeStyles((theme) => ({
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
  },
}));

interface FriendRequestReceivedProps extends FriendRequestReceivedData {}

const FriendRequestReceived: React.FC<FriendRequestReceivedProps> = ({
  _id,
  friendRequest,
  createdAt,
  hasBeenRead,
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const onAcceptBtnClicked = async () => {
    await acceptFriendRequest({
      friendRequestId: friendRequest._id,
    });
  };

  const onDeclineBtnClicked = async () => {
    await rejectFriendRequest({
      friendRequestId: friendRequest._id,
    });
    dispatch(removeNotification(_id));
  };

  return (
    <>
      <Link
        to={`/users/${friendRequest.sender._id}`}
        component={RouterLink}
        underline="none"
      >
        <Avatar
          src={friendRequest.sender.avatar}
          style={{ marginRight: 10, alignSelf: 'flex-start' }}
        >
          {(friendRequest.sender.username[0] || '').toUpperCase()}
        </Avatar>
      </Link>

      <Box>
        <Typography>
          <Link
            to={`/users/${friendRequest.sender._id}`}
            component={RouterLink}
            className={`${classes.author}`}
          >
            {friendRequest.sender.username}
          </Link>{' '}
          sent you a friend request.
        </Typography>
        <Box height="5px" />
        <Box display="flex">
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={onAcceptBtnClicked}
          >
            Accept
          </Button>
          <Box width="8px" />
          <Button
            variant="contained"
            size="small"
            onClick={onDeclineBtnClicked}
          >
            Decline
          </Button>
        </Box>
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

export default FriendRequestReceived;
