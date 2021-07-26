import { BasicProfileResponse } from 'src/types/lib';
import api from './api';

export const fetchBasicProfile = () => {
  return api.get<BasicProfileResponse>('/profile/basic');
};
