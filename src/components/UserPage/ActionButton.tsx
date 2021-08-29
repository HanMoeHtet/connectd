import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';

export interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactElement | null;
  text: string;
}
const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon, text }) => {
  return (
    <Button
      style={{
        textTransform: 'none',
        display: 'flex',
        alignItems: 'center',
      }}
      variant="contained"
      color="primary"
      onClick={onClick}
    >
      {icon}
      <Box width="8px"></Box>
      <Typography>{text}</Typography>
    </Button>
  );
};

export default ActionButton;
