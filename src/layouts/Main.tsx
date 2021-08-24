import { Grid, Hidden } from '@material-ui/core';
import React, { useEffect } from 'react';
import AppBar from 'src/components/AppBar';
import { AppModalProvider } from 'src/composables/AppModal';
import useAuth from 'src/composables/useAuth';
import Page from 'src/layouts/Page';
import { listenForFriendRequestReceived } from 'src/services/friend';
import { showToast } from 'src/services/notification';
import { useAppDispatch } from 'src/store';
import { addNewNotification } from 'src/store/notifications';

const Main: React.FC = ({ children }) => {
  const { isLoading } = useAuth();

  const dispatch = useAppDispatch();

  useEffect(() => {
    listenForFriendRequestReceived((data) => {
      const { _id, friendRequest, createdAt, isRead } = data;
      showToast(
        'info',
        `${friendRequest.sender.username} sent you a friend request`
      );

      dispatch(addNewNotification({ _id, friendRequest, createdAt, isRead }));
    });
  }, [dispatch]);

  if (isLoading) return null;

  return (
    <AppModalProvider>
      <Page>
        <AppBar />
        <Grid container>
          <Hidden mdDown>
            <Grid item md={3}></Grid>
          </Hidden>
          <Grid item xs={12} md={6}>
            {children}
          </Grid>
          <Hidden mdDown>
            <Grid item md={3}></Grid>
          </Hidden>
        </Grid>
      </Page>
    </AppModalProvider>
  );
};

export default Main;
