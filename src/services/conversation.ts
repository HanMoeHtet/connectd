import { BasicProfile } from 'src/types/lib';
import api from './api';
import { Conversation } from './user';
import socket from './ws';

interface GetConversationResponse {
  data: {
    conversation: Conversation;
  };
}

export const getConversation = (conversationId: string) => {
  return api.get<GetConversationResponse>(`/conversations/${conversationId}`);
};

interface GetMessagesInConversationOptions {
  conversationId: string;
  lastMessageId?: string;
}

export interface Message {
  _id: string;
  fromUser: BasicProfile;
  content: string;
  createdAt: Date;
}

interface GetMessagesInConversationSuccessResponse {
  data: {
    messages: Message[];
    hasMore: boolean;
  };
}

export const getMessagesInConversation = ({
  conversationId,
  lastMessageId,
}: GetMessagesInConversationOptions) => {
  return api.get<GetMessagesInConversationSuccessResponse>(
    `conversations/${conversationId}/messages?lastMessageId=${
      lastMessageId || ''
    }`
  );
};

interface CreateMessageInConversationOptions {
  conversationId: string;
  content: string;
}

interface CreateMessageInConversationSuccessResponse {
  data: {
    message: Message;
  };
}

export const createMessageInConversation = ({
  content,
  conversationId,
}: CreateMessageInConversationOptions) => {
  return api.post<CreateMessageInConversationSuccessResponse>(
    `conversations/${conversationId}/messages`,
    {
      content,
    }
  );
};

export interface MessageCreatedData {
  message: {
    _id: string;
    conversationId: string;
    content: string;
    fromUser: {
      _id: string;
      username: string;
      avatar?: string;
    };
    createdAt: Date;
  };
}
export const listenForMessageCreated = (
  cb: (data: MessageCreatedData) => void
) => {
  socket.on('message-created', (data: MessageCreatedData) => {
    cb(data);
  });

  return () => {
    socket.off('message-created');
  };
};
