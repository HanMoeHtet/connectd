import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Chat } from '@material-ui/icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOnlineFriends } from 'src/services/friend';
import {
  listenForUserOnlineStatus,
  StatusType,
} from 'src/services/online-status';
import { fetchUserBasicProfile } from 'src/services/user';
import { useAppDispatch, useAppSelector } from 'src/store';
import { startConversationWithUser } from 'src/store/conversations';
import { addUser, removeUser, setUsers } from 'src/store/online-status';
import StyledBadge from '../StyledBadge';

const useStyles = makeStyles((theme) => ({
  container: {
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'block',
      width: 0,
    },
  },
}));

const OnlineUsers: React.FC = () => {
  const classes = useStyles();

  const { users } = useAppSelector((state) => state.onlineStatusStore);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    setIsLoading(true);

    const alredyLoadedUserIds = users.map((user) => user._id);
    const response = await getOnlineFriends({
      notInUserIds: alredyLoadedUserIds,
    });
    const { onlineFriends, hasMore } = response.data.data;
    dispatch(setUsers([...users, ...onlineFriends]));

    setHasMore(hasMore);
    setIsLoading(false);
  }, [users, dispatch]);

  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(
        async (entries) => {
          const firstEntry = entries[0];
          if (firstEntry && firstEntry.isIntersecting && !isLoading) {
            await loadMore();
          }
        },
        // FIXME: check if network is wifi or not and set the threshold accordingly
        { rootMargin: '200px' }
      );

      if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [loadMore, isLoading, loadMoreRef]);

  useEffect(() => {
    const cancel = listenForUserOnlineStatus(async (data) => {
      const { status, userId } = data;
      if (status === StatusType.ONLINE) {
        const response = await fetchUserBasicProfile(userId);
        const { user } = response.data.data;
        dispatch(addUser(user));
      } else if (status === StatusType.OFFLINE) {
        dispatch(removeUser(userId));
      }
    });

    return cancel;
  }, [dispatch]);

  const getConversationWithUser = async (userId: string) => {
    dispatch(startConversationWithUser(userId));
  };

  return (
    <Box className={classes.container}>
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
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="chat"
                onClick={() => getConversationWithUser(user._id)}
              >
                <Chat />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {hasMore && (
        <Box display="flex" justifyContent="center" overflow="hidden">
          <CircularProgress color="primary" ref={loadMoreRef} />
        </Box>
      )}
    </Box>
  );
};

export default OnlineUsers;
