import { Box, Button, Avatar, Typography } from '@material-ui/core';
import React from 'react';
import useAuth from 'src/composables/useAuth';

const ProfileIconButton: React.FC = () => {
  const { profile } = useAuth();

  if (!profile) return null;

  const { username, avatar } = profile;

  return (
    <Box display={{ xs: 'none', md: 'block' }}>
      <Button style={{ borderRadius: 8, display: 'flex' }}>
        <Avatar src={avatar} style={{ marginRight: 5 }}>
          {(username[0] || '').toUpperCase()}
        </Avatar>
        <Typography style={{ textTransform: 'none' }}>{username}</Typography>
      </Button>
    </Box>
  );
};

export default ProfileIconButton;
