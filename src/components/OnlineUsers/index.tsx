import { useEffect } from 'react';
import { listenForUserOnlineStatus } from 'src/services/user-online-status';

const OnlineUsers: React.FC = () => {
  useEffect(() => {
    listenForUserOnlineStatus((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h1>Online Users</h1>
      <p>This is a list of all the users currently online.</p>
    </div>
  );
};

export default OnlineUsers;
