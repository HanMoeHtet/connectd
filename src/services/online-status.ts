import api from './api';
import socket from './ws';

interface GetOnlineStatusResponse {
  data: { userIds: string[] };
}

export const getOnlineStatus = () => {
  return api.get<GetOnlineStatusResponse>('/online-status');
};

export enum StatusType {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export interface UserOnlineStatusData {
  userId: string;
  status: StatusType;
}

export const listenForUserOnlineStatus = (
  cb: (data: UserOnlineStatusData) => void
) => {
  socket.on('user-online-status', (data: UserOnlineStatusData) => {
    cb(data);
  });
};
