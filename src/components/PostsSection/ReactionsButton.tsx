import { Box, Button, Typography } from '@material-ui/core';
import {
  Favorite,
  SentimentVerySatisfied,
  SentimentDissatisfied,
} from '@material-ui/icons';
import React, { useContext } from 'react';
import { ModalContext } from 'src/composables/AppModal';
import Reactions from './Reactions';

interface ReactionsButtonProps {
  fontSize?: 'default' | 'inherit' | 'large' | 'medium' | 'small';
}

const ReactionsButton: React.FC<ReactionsButtonProps> = ({ fontSize }) => {
  const { setContent } = useContext(ModalContext);

  return (
    <Button onClick={() => setContent(<Reactions />)}>
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
