import { BasicProfileResponse, Pronouns } from 'src/types/lib';
import api from './api';

export const fetchUserBasicProfile = (userId: string) => {
  return api.get<BasicProfileResponse>(`/users/${userId}/basic`);
};

export interface GetUserResponseData {
  user: {
    _id: string;
    username: string;
    email?: string;
    phoneNumber?: string;
    birthday: Date;
    pronouns: Pronouns;
    avatar?: string;
    friendCount: number;
    postCount: number;
  };
  areUsersFriends?: boolean;
  isAuthUser: boolean;
}
interface GetUserSuccessResponse {
  data: GetUserResponseData;
}
export const getUser = (userId: string) => {
  return api.get<GetUserSuccessResponse>(`/users/${userId}`);
};
