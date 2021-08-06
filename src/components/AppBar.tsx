import { AppBar as MuiAppBar, makeStyles, Toolbar } from '@material-ui/core';
import React from 'react';
import AppLogo from './AppLogo';
import NotificationsIconButton from './NotificationsIconButton';
import ProfileIconButton from './ProfileIconButton';
import SearchBar from './SearchBar';
import SearchIconButton from './SearchIconButton';
import SettingsIconButton from './SettingsIconButton';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

const AppBar: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <MuiAppBar position="sticky" style={{ backgroundColor: '#424242' }}>
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
