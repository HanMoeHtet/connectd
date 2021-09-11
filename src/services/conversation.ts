import { BasicProfile } from 'src/types/lib';
import api from './api';

interface GetMessagesInConversationOptions {
  conversationId: string;
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
}: GetMessagesInConversationOptions) => {
  return api.get<GetMessagesInConversationSuccessResponse>(
    `conversations/${conversationId}/messages`
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
