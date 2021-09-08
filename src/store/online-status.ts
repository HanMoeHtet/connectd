import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OnlineStatusState } from 'src/types';
import { BasicProfile } from 'src/types/lib';
import { RootState } from 'src/store';

const initialState: OnlineStatusState = {
  userIds: [],
  users: [],
};

const onlineStatusSlice = createSlice({
  name: 'onlineStatus',
  initialState,
  reducers: {
    setUserIds(state, action: PayloadAction<string[]>) {
      state.userIds = action.payload;
    },
    setUsers(state, action: PayloadAction<BasicProfile[]>) {
      state.users = action.payload;
    },
    addUser(state, action: PayloadAction<BasicProfile>) {
      state.userIds.push(action.payload._id);
      state.users = [action.payload, ...state.users];
    },
    removeUser(state, action: PayloadAction<string>) {
      const userId = action.payload;
      state.userIds.splice(state.userIds.indexOf(userId), 1);
      state.users.splice(
        state.users.findIndex((user) => user._id === userId),
        1
      );
    },
  },
});

export const { setUserIds, setUsers, addUser, removeUser } =
  onlineStatusSlice.actions;

export const selectIsUserOnline = (userId: string) => (state: RootState) =>
  state.onlineStatusStore.userIds.includes(userId);

export default onlineStatusSlice.reducer;
