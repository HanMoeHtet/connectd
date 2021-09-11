import * as React from 'react';
import { Box } from '@material-ui/core';
import ChatBox from './ChatBox/index.mock';

const LeftPanel: React.FC = () => {
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
      <Box
        width="320px"
        height="440px"
        style={{ border: '1px solid yellow', marginLeft: 10, marginBottom: 10 }}
      >
        <ChatBox />
      </Box>
    </Box>
  );
};

export default LeftPanel;
