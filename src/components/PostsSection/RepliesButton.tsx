import { Button, Typography } from '@material-ui/core';
import { Close, Reply, ThumbUp } from '@material-ui/icons';
import React, { useContext } from 'react';
import { ModalContext } from 'src/composables/AppModal';
import avatarImg from 'src/assets/images/avatar2.png';
import ReactButton from './ReactButton';
import ReactionsButton from './ReactionsButton';

const RepliesButton: React.FC = () => {
  const { setContent } = useContext(ModalContext);

  return (
    <Button style={{ padding: '5px 10px' }}>
      <Reply style={{ marginRight: 10 }} />
      <Typography>300</Typography>
    </Button>
  );
};

export default RepliesButton;
