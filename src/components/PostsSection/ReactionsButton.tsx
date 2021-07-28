import { Box, Button, Typography } from '@material-ui/core';
import {
  Favorite,
  SentimentVerySatisfied,
  SentimentDissatisfied,
} from '@material-ui/icons';
import React from 'react';

interface ReactionsButtonProps {
  fontSize?: 'default' | 'inherit' | 'large' | 'medium' | 'small';
}

const ReactionsButton: React.FC<ReactionsButtonProps> = ({ fontSize }) => {
  return (
    <Button>
      <Box display="flex" style={{ marginRight: 5 }}>
        <Favorite fontSize={fontSize} style={{ color: '#ef4561' }} />
        <SentimentVerySatisfied
          fontSize={fontSize}
          style={{ color: '#fbcd58' }}
        />
        <SentimentDissatisfied
          fontSize={fontSize}
          style={{ color: '#f07611' }}
        />
      </Box>
      <Typography>300</Typography>
    </Button>
  );
};

export default ReactionsButton;
