import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ChatBox from 'src/components/Conversation/ChatBox';
import { getConversation } from 'src/services/conversation';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  selectCurrentConversation,
  startConversation,
} from 'src/store/conversations';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 512,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
}));

interface ConversationPageProps {
  conversationId?: string;
}

const PostPage: React.FC = () => {
  const classes = useStyles();

  const { conversationId } = useParams<ConversationPageProps>();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const conversation = useAppSelector(selectCurrentConversation());

  useEffect(() => {
    (async () => {
      if (!conversationId) {
        history.push('/');
      } else {
        const response = await getConversation(conversationId);
        const { conversation } = response.data.data;

        dispatch(startConversation(conversation));
      }
    })();
  }, [conversationId, history, dispatch]);

  if (!conversation) return null;

  return (
    <Box className={classes.container} margin="auto" padding="15px 0">
      <ChatBox conversation={conversation} />
    </Box>
  );
};

export default PostPage;
