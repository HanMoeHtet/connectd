import * as React from 'react';
import { Box } from '@material-ui/core';
import ChatBox from './ChatBox';
import { useAppSelector } from 'src/store';
import { selectCurrentConversation } from 'src/store/conversations';

const LeftPanel: React.FC = () => {
  const conversation = useAppSelector(selectCurrentConversation());
  return (
    <Box
      style={{
        position: 'sticky',
        top: 'var(--appBarHeight)',
        height: 'calc(100vh - var(--appBarHeight))',
      }}
      display="flex"
      flexDirection="column"
    >
      <Box flexGrow="1" />
      {conversation && <ChatBox conversation={conversation} />}
    </Box>
  );
};

export default LeftPanel;
