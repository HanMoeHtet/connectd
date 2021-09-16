import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from 'src/services/conversation';
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

export const startConversation =
  (conversation: Conversation): AppThunk =>
  async (dispatch, getState) => {
    const { conversations } = getState().conversationsStore;
    const conversationCounts = conversations.length;
    dispatch(addNewConversation(conversation));
    dispatch(setCurrentConversationIndex(conversationCounts));
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
