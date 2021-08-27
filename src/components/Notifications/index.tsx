import { Box, CircularProgress, Divider } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { getNotifications } from 'src/services/profile';
import { useAppDispatch, useAppSelector } from 'src/store';
import { addNotifications, setHasMore } from 'src/store/notifications';
import Notification from './Notification';

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = () => {
  const dispatch = useAppDispatch();

  const { notifications, hasMore } = useAppSelector(
    (state) => state.notificationsStore
  );

  const [isLoading, setIsLoading] = useState(false);
  const [limit] = useState(10);
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    setIsLoading(true);
    const response = await getNotifications({
      lastNotificationId: notifications[notifications.length - 1]?._id,
      limit,
    });

    const { notifications: newNotifications, hasMore } = response.data.data;

    dispatch(addNotifications(newNotifications));
    dispatch(setHasMore(hasMore));

    setIsLoading(false);
  }, [limit, notifications, dispatch]);

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
  }, [isLoading, loadMore]);

  return (
    <>
      {notifications.map((notification) => (
        <li key={notification._id}>
          <div
            style={{
              display: 'flex',
              padding: 16,
              backgroundColor: notification.hasBeenRead
                ? 'transparent'
                : 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <Notification notification={notification} />
          </div>
          <Divider />
        </li>
      ))}
      {hasMore && (
        <Box display="flex" justifyContent="center" overflow="hidden">
          <CircularProgress color="primary" ref={loadMoreRef} />
        </Box>
      )}
    </>
  );
};

export default Notifications;
