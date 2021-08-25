import { Avatar, Box, Typography, Button } from '@material-ui/core';
import { formatDistance } from 'date-fns';
import React from 'react';
import {
  acceptFriendRequest,
  FriendRequestReceivedData,
} from 'src/services/friend';

interface FriendRequestReceivedProps extends FriendRequestReceivedData {}

const FriendRequestReceived: React.FC<FriendRequestReceivedProps> = ({
  _id,
  friendRequest,
  createdAt,
  isRead,
}) => {
  const onAcceptBtnClicked = async () => {
    await acceptFriendRequest({
      friendRequestId: friendRequest._id,
    });
  };

  return (
    <>
      <Avatar
        src={friendRequest.sender.avatar}
        style={{ marginRight: 10, alignSelf: 'flex-start' }}
      >
        {friendRequest.sender.username[0].toUpperCase()}
      </Avatar>
      <Box>
        <Typography>
          {friendRequest.sender.username} sent you a friend request.
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
          <Button variant="contained" size="small">
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
