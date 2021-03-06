import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'src/store';

const Guest: React.FC = ({ children }) => {
  const history = useHistory();

  const { isLoading } = useAppSelector((state) => state.authStore);
  const profile = useAppSelector((state) => state.profileStore.profile);

  if (isLoading) return null;

  if (profile) {
    history.replace('/');
    return null;
  }

  return <>{children}</>;
};

export default Guest;
