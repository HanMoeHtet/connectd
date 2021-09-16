import * as React from 'react';
import { Box, Tooltip } from '@material-ui/core';
import { format } from 'date-fns';
import { Message as IMessage } from 'src/services/conversation';
import useAuth from 'src/composables/useAuth';

interface MessageProps extends IMessage {}

const Message: React.FC<MessageProps> = ({
  _id,
  fromUser,
  content,
  createdAt,
}) => {
  const { profile } = useAuth();

  if (!profile) {
    return null;
  }

  const { _id: authUserId } = profile;

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: fromUser._id !== authUserId ? 'flex-start' : 'flex-end',
      }}
    >
      <Tooltip
        title={format(new Date(createdAt), 'h:m a, MMM do, yyyy')}
        aria-label="message"
        arrow
        placement={'right'}
      >
        <Box
          display="inline-block"
          padding="8px"
          style={{
            backgroundColor: 'rgb(175 164 164 / 40%)',
            color: '#d6d6d6',
            padding: 10,
            borderRadius: 20,
            maxWidth: '80%',
          }}
        >
          {content}
        </Box>
      </Tooltip>
    </Box>
  );
};

export default Message;
