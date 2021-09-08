import { Box } from '@material-ui/core';
import OnlineUsers from '../OnlineUsers';

const RightPanel: React.FC = () => {
  return (
    <Box
      style={{
        position: 'sticky',
        top: 'var(--appBarHeight)',
        maxHeight: 'calc(100vh - var(--appBarHeight))',
      }}
      display="flex"
      flexDirection="column"
    >
      <OnlineUsers />
    </Box>
  );
};

export default RightPanel;
