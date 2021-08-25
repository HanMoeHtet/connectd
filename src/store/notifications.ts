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
  },
});

export const { addNewNotification, setNewNotificationsCount } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
