import { Notification } from 'src/store/notifications';
import { BasicProfileResponse } from 'src/types/lib';
import api from './api';

export const fetchBasicProfile = () => {
  return api.get<BasicProfileResponse>('/profile/basic');
};

interface GetNewNotificationsCountResponseData {
  data: {
    newNotificationsCount: number;
  };
}

export const getNewNotificationsCount = () => {
  return api.get<GetNewNotificationsCountResponseData>(
    '/profile/new-notifications-count'
  );
};

interface GetNotificationsOptions {
  limit: number;
  lastNotificationId?: string;
}

interface GetNotificationsResponseData {
  data: {
    notifications: Notification[];
    hasMore: boolean;
  };
}

export const getNotifications = ({
  limit,
  lastNotificationId,
}: GetNotificationsOptions) => {
  return api.get<GetNotificationsResponseData>(
    `/profile/notifications?limit=${limit}&lastNotificationId=${
      lastNotificationId || ''
    }`
  );
};
