import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FriendRequestAcceptedData,
  FriendRequestReceivedData,
} from 'src/services/friend';

export type Notification =
  | FriendRequestReceivedData
  | FriendRequestAcceptedData;

export interface NotificationsState {
  notifications: Notification[];
  newNotificationsCount: number;
}

const initialState: NotificationsState = {
  notifications: [],
  newNotificationsCount: 0,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNewNotification(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload);
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

export const {
  addNewNotification,
  setNewNotificationsCount,
  removeNotification,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
