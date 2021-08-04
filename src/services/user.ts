import { BasicProfileResponse } from 'src/types/lib';
import api from './api';

export const fetchUserBasicProfile = (userId: string) => {
  return api.get<BasicProfileResponse>(`/users/${userId}/basic`);
};
