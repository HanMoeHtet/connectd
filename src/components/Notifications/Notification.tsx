import React from 'react';
import { Notification as TNotification } from 'src/store/notifications';
import { NotificationType } from 'src/types/lib';
import FriendRequestAccepted from './FriendRequestAccepted';
import FriendRequestReceived from './FriendRequestReceived';

interface NotificationProps {
  notification: TNotification;
}
const Notification: React.FC<NotificationProps> = ({ notification }) => {
  if (notification.type === NotificationType.FRIEND_REQUEST_RECEIVED) {
    return <FriendRequestReceived {...notification} />;
  }

  if (notification.type === NotificationType.FRIEND_REQUEST_ACCEPTED) {
    return <FriendRequestAccepted {...notification} />;
  }
  return null;
};

export default Notification;
