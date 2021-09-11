import * as React from 'react';
import { Box, Tooltip } from '@material-ui/core';
import { format } from 'date-fns';

interface MessageProps {
  placement: 'left' | 'right';
  content: string;
}

const Message: React.FC<MessageProps> = ({ placement, content }) => {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: placement === 'left' ? 'flex-start' : 'flex-end',
      }}
    >
      <Tooltip
        title={format(new Date(), 'h:m a, MMM do, yyyy')}
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
