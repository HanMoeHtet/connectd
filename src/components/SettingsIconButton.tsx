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
import { Link } from 'react-router-dom';
import useAuth from 'src/composables/useAuth';
import { useAppDispatch } from 'src/store';
import { logOut } from 'src/store/auth';
import Logout from './icons/Logout';

const SettingsIconButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { profile } = useAuth();

  if (!profile) return null;

  const { username, avatar, _id } = profile;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onLogOutClicked = () => {
    dispatch(logOut());
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
      <MenuItem
        component={Link}
        to={`/users/${_id}`}
        style={{ textDecoration: 'none' }}
      >
        <Avatar src={avatar} style={{ marginRight: 5 }}>
          {(username[0] || '').toUpperCase()}
        </Avatar>
        <Typography style={{ textTransform: 'none' }}>{username}</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onLogOutClicked}>
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
