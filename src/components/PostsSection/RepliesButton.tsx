import { Button, Typography } from '@material-ui/core';
import { Reply } from '@material-ui/icons';
import React from 'react';

interface RepliesButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RepliesButton: React.FC<RepliesButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} style={{ padding: '5px 10px' }}>
      <Reply style={{ marginRight: 10 }} />
      <Typography>300</Typography>
    </Button>
  );
};

export default RepliesButton;
