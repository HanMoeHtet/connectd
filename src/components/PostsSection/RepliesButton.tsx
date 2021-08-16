import { Button, Typography } from '@material-ui/core';
import { Reply } from '@material-ui/icons';
import React from 'react';

interface RepliesButtonProps {
  replyCount: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RepliesButton: React.FC<RepliesButtonProps> = ({
  onClick,
  replyCount,
}) => {
  return (
    <Button onClick={onClick} style={{ padding: '5px 10px' }}>
      <Reply style={{ marginRight: 10 }} />
      <Typography>{replyCount}</Typography>
    </Button>
  );
};

export default RepliesButton;
