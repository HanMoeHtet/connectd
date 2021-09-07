import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OnlineUsersState } from 'src/types';
import { BasicProfile } from 'src/types/lib';

const initialState: OnlineUsersState = {
  users: [],
};

const onlineUsersSlice = createSlice({
  name: 'onlineUsers',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<BasicProfile[]>) {
      state.users = action.payload;
    },
    addUser(state, action: PayloadAction<BasicProfile>) {
      state.users = [action.payload, ...state.users];
    },
    removeUser(state, action: PayloadAction<string>) {
      const userId = action.payload;
      state.users = state.users.filter((user) => user._id !== userId);
    },
  },
});

export const { setUsers, addUser, removeUser } = onlineUsersSlice.actions;

export default onlineUsersSlice.reducer;
