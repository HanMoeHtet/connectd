import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendRequestReceivedData } from 'src/services/friend';

export interface FriendRequestReceivedNotification
  extends FriendRequestReceivedData {}

type Notification = FriendRequestReceivedNotification;

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
