import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { formatDistance } from 'date-fns';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MessageEditor from 'src/components/LeftPanel/ChatBox/MessageEditor';
import MessageList from 'src/components/LeftPanel/ChatBox/MessageList';
import {
  listenForMessageCreated,
  Message as TMessage,
} from 'src/services/conversation';
import { useAppDispatch, useAppSelector } from 'src/store';
import { addNewMessage } from 'src/store/conversations';
import { selectIsUserOnline } from 'src/store/online-status';
import { Conversation } from 'src/types';

const useStyles = makeStyles((theme) => ({
  author: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: theme.typography.body1.fontSize,
  },
}));

interface ChatBoxProps {
  conversation: Conversation;
}

const ChatBox: React.FC<ChatBoxProps> = ({ conversation }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { user, lastSeenAt: initialLastSeenAt } = conversation;

  const isUserOnline = useAppSelector((state) => {
    if (conversation) return selectIsUserOnline(conversation.user._id)(state);
    else return false;
  });

  const [lastSeenAt, setLastSeenAt] = React.useState<Date | null>(
    initialLastSeenAt
  );

  const onMessageCreated = React.useCallback(
    (message: TMessage) => {
      if (conversation) {
        dispatch(addNewMessage(conversation._id, message));
      }
    },
    [dispatch, conversation]
  );

  React.useEffect(() => {
    const cancel = listenForMessageCreated((data) => {
      const { message } = data;
      if (
        conversation &&
        conversation.messages.find((m) => m._id === message._id) === undefined
      ) {
        onMessageCreated(message);
      }
    });

    return cancel;
  }, [onMessageCreated, conversation]);

  React.useEffect(() => {
    if (!isUserOnline) {
      setLastSeenAt(new Date());
    }
  }, [isUserOnline]);

  return (
    <Box width="100%" height="600px">
      <Card
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardHeader
          avatar={
            <Link
              to={`/users/${user._id}`}
              component={RouterLink}
              underline="none"
            >
              <Avatar src={user.avatar}>
                {(user.username[0] || '').toUpperCase()}
              </Avatar>
            </Link>
          }
          title={
            <Link
              to={`/users/${user._id}`}
              component={RouterLink}
              className={`${classes.author}`}
            >
              <span>{user.username}</span>
            </Link>
          }
          subheader={
            <Typography variant="body2" color="textSecondary">
              {lastSeenAt === null
                ? 'active now'
                : formatDistance(lastSeenAt, new Date(), {
                    addSuffix: true,
                  })}
            </Typography>
          }
        />
        <Divider />
        <MessageList />
        <MessageEditor />
      </Card>
    </Box>
  );
};

export default ChatBox;
