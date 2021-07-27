import React from 'react';
import {
  AppBar as MuiAppBar,
  Badge,
  IconButton,
  Toolbar,
  makeStyles,
  Avatar,
  Typography,
  Button,
  InputBase,
  alpha,
  Menu,
  MenuItem,
  Box,
} from '@material-ui/core';
import AppLogo from './AppLogo';
import {
  More as MoreIcon,
  Settings,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import SettingsIconButton from './SettingsIconButton';
import NotificationsIconButton from './NotificationsIconButton';
import SearchBar from './SearchBar';
import ProfileIconButton from './ProfileIconButton';
import SearchIconButton from './SearchIconButton';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

const AppBar: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <MuiAppBar position="static" color="transparent">
        <Toolbar>
          <AppLogo linkTo="/" />
          <SearchBar />
          <div className={classes.grow}></div>
          <div style={{ display: 'flex' }}>
            <ProfileIconButton />
            <SearchIconButton />
            <NotificationsIconButton />
            <SettingsIconButton />
          </div>
        </Toolbar>
      </MuiAppBar>
    </>
  );
};

export default AppBar;
