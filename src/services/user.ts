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
  friendId?: string;
  sentFriendRequestId?: string;
  receivedFriendRequestId?: string;
  isAuthUser: boolean;
}
interface GetUserSuccessResponse {
  data: GetUserResponseData;
}
export const getUser = (userId: string) => {
  return api.get<GetUserSuccessResponse>(`/users/${userId}`);
};

interface GetFriendsByUserOptions {
  userId: string;
  lastFriendId?: string;
  limit: number;
}

export interface Friend {
  _id: string;
  user: {
    _id: string;
    username: string;
    avatar?: string;
    areUsersFriends: boolean;
  };
  createdAt: Date;
}

interface GetFriendsByUserSuccessResponse {
  data: {
    friends: Friend[];
    hasMore: boolean;
  };
}

export const getFriendsByUser = ({
  userId,
  lastFriendId,
  limit,
}: GetFriendsByUserOptions) => {
  return api.get<GetFriendsByUserSuccessResponse>(
    `/users/${userId}/friends?lastFriendId=${lastFriendId || ''}&limit=${limit}`
  );
};

interface GetFriendsByUserOPtions {
  userId: string;
}

interface GetConversationWithUserSuccessResponse {
  data: {
    conversationId: string;
  };
}

export const getConversationWithUser = ({
  userId,
}: GetFriendsByUserOPtions) => {
  return api.get<GetConversationWithUserSuccessResponse>(
    `/users/${userId}/conversation`
  );
};
