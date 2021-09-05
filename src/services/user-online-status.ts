import socket from './ws';

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
