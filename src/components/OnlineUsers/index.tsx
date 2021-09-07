import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOnlineFriends } from 'src/services/friend';
import { fetchUserBasicProfile } from 'src/services/user';
import {
  listenForUserOnlineStatus,
  StatusType,
} from 'src/services/user-online-status';
import { useAppDispatch, useAppSelector } from 'src/store';
import { addUser, removeUser, setUsers } from 'src/store/online-users';
import StyledBadge from './StyledBadge';

const OnlineUsers: React.FC = () => {
  const { users } = useAppSelector((state) => state.onlineUsersStore);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const response = await getOnlineFriends({ notInUserIds: [] });
      const { onlineFriends } = response.data.data;
      dispatch(setUsers(onlineFriends));
    })();
  }, [dispatch]);

  useEffect(() => {
    listenForUserOnlineStatus(async (data) => {
      const { status, userId } = data;
      if (status === StatusType.ONLINE) {
        const response = await fetchUserBasicProfile(userId);
        const { user } = response.data.data;
        dispatch(addUser(user));
      } else if (status === StatusType.OFFLINE) {
        dispatch(removeUser(userId));
      }
    });
  }, [dispatch]);

  return (
    <div>
      <List>
        {users.map((user) => (
          <ListItem key={user._id} style={{ padding: 0 }}>
            <Button
              component={Link}
              to={`/users/${user._id}`}
              style={{
                borderRadius: 8,
                width: '100%',
                textDecoration: 'none',
                textTransform: 'none',
                paddingTop: 8,
                paddingBottom: 8,
              }}
            >
              <ListItemAvatar>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  variant="dot"
                >
                  <Avatar src={user.avatar}>
                    {(user.username[0] || '').toUpperCase()}
                  </Avatar>
                </StyledBadge>
              </ListItemAvatar>

              <ListItemText primary={user.username} />
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default OnlineUsers;
