import { Avatar, Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from 'src/composables/useAuth';

const ProfileIconButton: React.FC = () => {
  const { profile } = useAuth();

  if (!profile) return null;

  const { username, avatar, _id } = profile;

  return (
    <Box display={{ xs: 'none', md: 'block' }}>
      <Button
        component={Link}
        to={`/users/${_id}`}
        style={{ borderRadius: 8, display: 'flex', textDecoration: 'none' }}
      >
        <Avatar src={avatar} style={{ marginRight: 5 }}>
          {(username[0] || '').toUpperCase()}
        </Avatar>
        <Typography style={{ textTransform: 'none' }}>{username}</Typography>
      </Button>
    </Box>
  );
};

export default ProfileIconButton;
