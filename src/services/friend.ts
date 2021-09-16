import api from 'src/services/api';
import socket from 'src/services/ws';
import {
  BaseNotification,
  BasicProfile,
  NotificationType,
} from 'src/types/lib';

interface CreateFriendRequestOptions {
  userId: string;
}

interface CreateFriendRequestResponse {
  data: {
    friendRequestId: string;
  };
}

export const createFriendRequest = ({ userId }: CreateFriendRequestOptions) => {
  return api.post<CreateFriendRequestResponse>(`/users/${userId}/friends`);
};

export interface FriendRequestReceivedData extends BaseNotification {
  type: NotificationType.FRIEND_REQUEST_RECEIVED;
  friendRequest: {
    _id: string;
    sender: {
      _id: string;
      username: string;
      avatar?: string;
    };
    receiverId: string;
    createdAt: Date;
  };
}
export const listenForFriendRequestReceived = (
  cb: (data: FriendRequestReceivedData) => void
) => {
  socket.on('friend-request-received', (data: FriendRequestReceivedData) => {
    cb(data);
  });

  return () => {
    socket.off('friend-request-received');
  }
};

interface CancelFriendRequestOptions {
  friendRequestId: string;
}

export const cancelFriendRequest = ({
  friendRequestId,
}: CancelFriendRequestOptions) => {
  return api.post(`/friend-requests/${friendRequestId}/cancel`);
};

interface AcceptFriendRequestOptions {
  friendRequestId: string;
}

interface AcceptFriendRequestResponse {
  data: {
    friendId: string;
  };
}

export const acceptFriendRequest = ({
  friendRequestId,
}: AcceptFriendRequestOptions) => {
  return api.post<AcceptFriendRequestResponse>(
    `/friend-requests/${friendRequestId}/accept`
  );
};

export interface FriendRequestAcceptedData extends BaseNotification {
  type: NotificationType.FRIEND_REQUEST_ACCEPTED;
  friendUser: {
    _id: string;
    username: string;
    avatar?: string;
  };
}
export const listenForFriendRequestAccepted = (
  cb: (data: FriendRequestAcceptedData) => void
) => {
  socket.on('friend-request-accepted', (data: FriendRequestAcceptedData) => {
    cb(data);
  });

  return () => {
    socket.off('friend-request-accepted')
  }
};

interface RejectFriendRequestOptions {
  friendRequestId: string;
}

export const rejectFriendRequest = ({
  friendRequestId,
}: RejectFriendRequestOptions) => {
  return api.post(`/friend-requests/${friendRequestId}/reject`);
};

interface UnfriendOptions {
  friendId: string;
}

export const unfriend = ({ friendId }: UnfriendOptions) => {
  return api.delete(`/friends/${friendId}`);
};

interface GetOnlineFriendsOptions {
  notInUserIds: string[];
}

interface GetOnlineFriendsResponse {
  data: {
    onlineFriends: BasicProfile[];
    hasMore: boolean;
  };
}

export const getOnlineFriends = ({ notInUserIds }: GetOnlineFriendsOptions) => {
  return api.post<GetOnlineFriendsResponse>('/friends/online', {
    notInUserIds,
  });
};
