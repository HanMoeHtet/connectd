import React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from 'src/components/AppBar';
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
    <Page>
      <AppBar />
    </Page>
  );
};

export default Newsfeed;
