import { Grid, Hidden } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from 'src/components/AppBar';
import PostsSection from 'src/components/PostsSection';
import { AppModalProvider } from 'src/composables/AppModal';
import useAuth from 'src/composables/useAuth';
import Page from 'src/layouts/Page';

const Newsfeed: React.FC = () => {
  const history = useHistory();

  // const { isLoading, profile } = useAuth();

  // if (isLoading) return null;

  // if (!profile) {
  //   history.replace('/login');
  //   return null;
  // }

  // MOCK: updating UI
  const profile = {
    username: 'Han Moe Htet',
    id: '12313213',
    avatar: undefined,
  };

  const { username, id, avatar } = profile;

  return (
    <AppModalProvider>
      <Page>
        <AppBar />
        <Grid container>
          <Hidden mdDown>
            <Grid item md={3}></Grid>
          </Hidden>
          <Grid item xs={12} md={6}>
            <PostsSection />
          </Grid>
          <Hidden mdDown>
            <Grid item md={3}></Grid>
          </Hidden>
        </Grid>
      </Page>
    </AppModalProvider>
  );
};

export default Newsfeed;
