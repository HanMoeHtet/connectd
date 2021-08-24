import api from 'src/services/api';
import socket from 'src/services/ws';

interface CreateFriendRequestOptions {
  userId: string;
}

export const createFriendRequest = ({ userId }: CreateFriendRequestOptions) => {
  return api.post(`/users/${userId}/friends`);
};

export interface FriendRequestReceivedData {
  _id: string;
  isRead: boolean;
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
  createdAt: Date;
}

export const listenForFriendRequestReceived = (
  cb: (data: FriendRequestReceivedData) => void
) => {
  socket.on('friend-request-received', (data: FriendRequestReceivedData) => {
    cb(data);
  });
};
