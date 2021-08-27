import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FriendRequestAcceptedData,
  FriendRequestReceivedData,
} from 'src/services/friend';
import { getNewNotificationsCount } from 'src/services/profile';
import { AppThunk } from '.';

export type Notification =
  | FriendRequestReceivedData
  | FriendRequestAcceptedData;

export interface NotificationsState {
  notifications: Notification[];
  hasMore: boolean;
  newNotificationsCount: number;
}

const initialState: NotificationsState = {
  notifications: [],
  hasMore: true,
  newNotificationsCount: 0,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotifications(state, action: PayloadAction<Notification[]>) {
      state.notifications.unshift(...action.payload);
    },

    setHasMore(state, action: PayloadAction<boolean>) {
      state.hasMore = action.payload;
    },

    addNewNotification(state, action: PayloadAction<Notification>) {
      state.notifications.unshift(action.payload);
      state.newNotificationsCount += 1;
    },

    setNewNotificationsCount(state, action: PayloadAction<number>) {
      state.newNotificationsCount = action.payload;
    },

    removeNotification(state, action: PayloadAction<string>) {
      const index = state.notifications.findIndex(
        (notification) => notification._id === action.payload
      );
      const notification = state.notifications[index];

      if (!notification) {
        console.error(`Notification with id ${action.payload} not found`);
        return;
      }

      state.notifications.splice(
        state.notifications.findIndex((n) => n._id === notification._id),
        1
      );

      if (notification.hasBeenSeen) {
        state.newNotificationsCount -= 1;
      }
    },
  },
});

export const fetNewNotificationsCount =
  (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    let response;

    try {
      response = await getNewNotificationsCount();
    } catch (e) {
      throw e;
    }

    const { newNotificationsCount } = response.data.data;
    dispatch(setNewNotificationsCount(newNotificationsCount));
  };

export const {
  addNewNotification,
  setNewNotificationsCount,
  removeNotification,
  addNotifications,
  setHasMore,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
