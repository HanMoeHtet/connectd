import { Box, Button, Avatar, Typography } from '@material-ui/core';
import React from 'react';
import avatarImg from 'src/assets/images/avatar2.png';

const ProfileIconButton: React.FC = () => {
  return (
    <Box display={{ xs: 'none', md: 'block' }}>
      <Button style={{ borderRadius: 8, display: 'flex' }}>
        <Avatar src={avatarImg} style={{ marginRight: 5 }} />
        <Typography style={{ textTransform: 'none' }}>Han Moe Htet</Typography>
      </Button>
    </Box>
  );
};

export default ProfileIconButton;
