import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { createFriendRequest } from 'src/services/friend';
import { Friend, getFriendsByUser } from 'src/services/user';

interface FriendsProps {
  userId: string;
}

const Friends: React.FC<FriendsProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [limit] = useState(10);
  const loadMoreRef = React.useRef<HTMLDivElement>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    setIsLoading(true);
    const response = await getFriendsByUser({
      userId,
      lastFriendId: friends[friends.length - 1]?._id,
      limit,
    });
    const { friends: newFriends, hasMore } = response.data.data;
    setFriends([...friends, ...newFriends]);
    setHasMore(hasMore);
    setIsLoading(false);
  }, [limit, friends, userId]);

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
        { rootMargin: '1000px' }
      );

      if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [isLoading, loadMore]);

  const handleClick = async (userId: string) => {
    await createFriendRequest({ userId });
  };

  return (
    <>
      <List disablePadding>
        {friends.map((friend) => (
          <ListItem key={friend._id}>
            <ListItemAvatar>
              <Avatar src={friend.user.avatar}>
                {(friend.user.username[0] || '').toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={friend.user.username} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="add friend"
                onClick={() => handleClick(friend.user._id)}
              >
                <PersonAdd />
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
    </>
  );
};

export default Friends;
