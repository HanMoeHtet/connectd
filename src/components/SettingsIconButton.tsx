import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import React from 'react';
import Logout from './icons/Logout';
import useAuth from 'src/composables/useAuth';

const SettingsIconButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { profile } = useAuth();

  if (!profile) return null;

  const { username, avatar } = profile;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'settings-menu';

  const renderSettings = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Avatar src={avatar} style={{ marginRight: 5 }}>
          {(username[0] || '').toUpperCase()}
        </Avatar>
        <Typography style={{ textTransform: 'none' }}>{username}</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <Logout style={{ marginRight: 5 }} />
        <Typography style={{ textTransform: 'none' }}>Logout</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <IconButton
        aria-label="more settings"
        aria-haspopup="true"
        aria-controls={menuId}
        color="inherit"
        onClick={handleMenuOpen}
      >
        <Settings />
      </IconButton>
      {renderSettings}
    </>
  );
};

export default SettingsIconButton;
