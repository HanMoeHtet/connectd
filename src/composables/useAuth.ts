import { useAppSelector } from 'src/store';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const useAuth = () => {
  const history = useHistory();

  const { isLoading } = useAppSelector((state) => state.authStore);
  const profile = useAppSelector((state) => state.profileStore.profile);

  useEffect(() => {
    if (!isLoading && !profile) {
      history.replace('/login');
    }
  }, [isLoading, profile, history]);

  return { isLoading, profile };
};

export default useAuth;
