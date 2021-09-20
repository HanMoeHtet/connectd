import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from 'src/services/conversation';
import {
  Conversation as BaseConversation,
  getConversationWithUser,
} from 'src/services/user';
import { Conversation, ConversationsState } from 'src/types';
import { AppThunk, RootState } from '.';

const initialState: ConversationsState = {
  conversations: [],
  currentConversationIndex: null,
};

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addNewConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.push(action.payload);
    },
    setCurrentConversationIndex: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.currentConversationIndex = action.payload;
    },
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations = state.conversations.map((conversation) => {
        if (conversation._id === action.payload._id) {
          return action.payload;
        }
        return conversation;
      });
    },
  },
});

export const selectCurrentConversation = () => (state: RootState) => {
  const { currentConversationIndex, conversations } = state.conversationsStore;
  return currentConversationIndex === null
    ? undefined
    : conversations[currentConversationIndex];
};

export const {
  addNewConversation,
  setCurrentConversationIndex,
  updateConversation,
} = conversationsSlice.actions;

export const startConversationWithUser =
  (userId: string): AppThunk =>
  async (dispatch, getState) => {
    const response = await getConversationWithUser({ userId });
    const { conversation } = response.data.data;

    dispatch(startConversation(conversation));
  };

export const startConversation =
  (conversation: BaseConversation): AppThunk =>
  async (dispatch, getState) => {
    const { conversations } = getState().conversationsStore;
    const conversationCounts = conversations.length;

    const conversationIndex = conversations.findIndex(
      (c) => c._id === conversation._id
    );

    if (conversationIndex === -1) {
      dispatch(
        addNewConversation({
          ...conversation,
          messages: [],
          hasMore: true,
          hasLoadedBefore: false,
        })
      );
      dispatch(setCurrentConversationIndex(conversationCounts));
    } else {
      dispatch(setCurrentConversationIndex(conversationIndex));
    }
  };

export const setMessages =
  (messages: Message[]): AppThunk =>
  (dispatch, getState) => {
    const { conversations, currentConversationIndex } =
      getState().conversationsStore;

    if (currentConversationIndex === null) return;

    const conversation = conversations[currentConversationIndex];
    if (conversation) {
      dispatch(
        updateConversation({
          ...conversation,
          messages,
        })
      );
    }
  };

export const addNewMessage =
  (conversationId: string, message: Message): AppThunk =>
  (dispatch, getState) => {
    const { conversations } = getState().conversationsStore;
    const conversation = conversations.find(
      (conversation) => conversationId === conversation._id
    );

    if (conversation) {
      dispatch(setMessages([message, ...conversation.messages]));
    }
  };

export default conversationsSlice.reducer;
