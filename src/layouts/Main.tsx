import { Grid, Hidden } from '@material-ui/core';
import React from 'react';
import AppBar from 'src/components/AppBar';
import { AppModalProvider } from 'src/composables/AppModal';
import useAuth from 'src/composables/useAuth';
import Page from 'src/layouts/Page';

const Newsfeed: React.FC = ({ children }) => {
  const { isLoading } = useAuth();

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

export default Newsfeed;
