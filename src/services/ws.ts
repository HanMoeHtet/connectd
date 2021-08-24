import { io } from 'socket.io-client';

const wsURL = process.env.REACT_APP_WS_URL;

if (!wsURL) {
  console.error('No WS URL provided');
  console.trace();
  process.exit();
}

const socket = io(wsURL, {
  autoConnect: false,
});

export const connect = (token: string) => {
  socket.auth = {
    token: `Bearer ${token}`,
  };
  socket.connect();
};

export const disconnect = () => {
  socket.disconnect();
};

socket.on('connect_error', (err: any) => {
  console.error('Connect Error', err);
  disconnect();
});

export default socket;
