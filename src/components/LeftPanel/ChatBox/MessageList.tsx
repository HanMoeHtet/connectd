import { Box, CircularProgress, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { getMessagesInConversation } from 'src/services/conversation';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  selectCurrentConversation,
  setMessages,
} from 'src/store/conversations';
import Message from './Message';

const useStyles = makeStyles((theme) => ({
  container: {
    '&::-webkit-scrollbar': {
      display: 'block',
      width: 6,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

interface MessageListProps {}

const MessageList: React.FC<MessageListProps> = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const conversation = useAppSelector(selectCurrentConversation());

  const loadMoreRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const hasLoadedBefore = React.useRef<boolean>(false);

  const loadMore = React.useCallback(async () => {
    if (conversation) {
      setIsLoading(true);

      const response = await getMessagesInConversation({
        conversationId: conversation._id,
        lastMessageId:
          conversation.messages[conversation.messages.length - 1]?._id,
      });

      const { messages: newMessages, hasMore } = response.data.data;
      dispatch(setMessages([...conversation.messages, ...newMessages]));
      setHasMore(hasMore);

      setIsLoading(false);
    }
  }, [conversation, dispatch]);

  React.useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(
        async (entries) => {
          const firstEntry = entries[0];
          if (firstEntry && firstEntry.isIntersecting && !isLoading) {
            await loadMore();
            if (containerRef.current) {
              if (!hasLoadedBefore.current) {
                containerRef.current.scrollTo(
                  0,
                  containerRef.current.scrollHeight
                );
                hasLoadedBefore.current = true;
              }
            }
          }
        },
        // FIXME: check if network is wifi or not and set the threshold accordingly
        { rootMargin: '200px' }
      );

      if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [isLoading, loadMore]);

  if (!conversation) {
    return null;
  }

  const { messages } = conversation;

  return (
    <Box
      style={{ flexGrow: 1, padding: 8, overflowY: 'auto' }}
      className={classes.container}
      {...{ ref: containerRef }}
    >
      {hasMore && (
        <Box display="flex" justifyContent="center" overflow="hidden">
          <CircularProgress color="primary" ref={loadMoreRef} />
        </Box>
      )}
      {[...messages].reverse().map((message, index) => {
        return (
          <React.Fragment key={message._id}>
            <Message {...message} />
            {index !== messages.length - 1 && <Box height="5px" />}
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default MessageList;
