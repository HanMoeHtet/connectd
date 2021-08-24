import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authStore from './auth';
import postsStore from './posts';
import profileStore from './profile';
import verificationStore from './verification';
import notificationsStore from './notifications';

export const store = configureStore({
  reducer: {
    authStore,
    verificationStore,
    notificationsStore,
    profileStore,
    postsStore,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
