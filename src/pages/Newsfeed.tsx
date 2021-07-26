import React from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from 'src/composables/useAuth';

const Newsfeed: React.FC = () => {
  const history = useHistory();

  const { isLoading, profile } = useAuth();

  if (isLoading) return null;

  if (!profile) {
    history.replace('/login');
    return null;
  }

  const { username, id, avatar } = profile;

  return (
    <div>
      <h1>Newsfeed</h1>
      {JSON.stringify(profile, null, 2)}
    </div>
  );
};

export default Newsfeed;
