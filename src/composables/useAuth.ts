import { useAppSelector } from 'src/store';

const useAuth = () => {
  const { isLoading } = useAppSelector((state) => state.authStore);
  const profile = useAppSelector((state) => state.profileStore);

  return { isLoading, profile };
};

export default useAuth;
