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
import avatarImg from 'src/assets/images/avatar2.png';
import Logout from './icons/Logout';

const SettingsIconButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
        <Avatar src={avatarImg} style={{ marginRight: 5 }} />
        <Typography style={{ textTransform: 'none' }}>Han Moe Htet</Typography>
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
