import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'src/store';

const Guest: React.FC = ({ children }) => {
  const history = useHistory();

  const { isLoading } = useAppSelector((state) => state.authStore);
  const profile = useAppSelector((state) => state.profileStore);

  if (isLoading) return null;

  if (profile) {
    history.replace('/newsfeed');
    return null;
  }

  return <>{children}</>;
};

export default Guest;
