import {
  Avatar,
  Badge,
  Box,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { Notifications as NotificationsIcon } from '@material-ui/icons';
import React from 'react';
import useAuth from 'src/composables/useAuth';

const useStyles = makeStyles((theme) => ({
  menu: {
    width: 500,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

const NotificationsIconButton: React.FC = () => {
  const classes = useStyles();

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

  const menuId = 'notificatinos-menu';

  const renderSettings = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      classes={{ paper: classes.menu }}
    >
      <MenuItem onClick={handleMenuClose} style={{ whiteSpace: 'normal' }}>
        <Avatar
          src={avatar}
          style={{ marginRight: 10, alignSelf: 'flex-start' }}
        >
          {username[0].toUpperCase()}
        </Avatar>
        <Box>
          <Typography style={{}}>
            Han Moe Htet sent you a friend request.Han Moe Htet sent you a
            friend request.Han Moe Htet sent you a friend request.Han Moe Htet
            sent you a friend request.Han Moe Htet sent you a friend request.Han
            Moe Htet sent you a friend request.
          </Typography>
          <Typography style={{ color: '#7d7d7d' }}>3 mins ago.</Typography>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} style={{ whiteSpace: 'normal' }}>
        <Avatar
          src={avatar}
          style={{ marginRight: 10, alignSelf: 'flex-start' }}
        >
          {username[0].toUpperCase()}
        </Avatar>
        <Box>
          <Typography style={{}}>
            Han Moe Htet sent you a friend request.Han Moe Htet sent you a
            friend request.Han Moe Htet sent you a friend request.Han Moe Htet
            sent you a friend request.Han Moe Htet sent you a friend request.Han
            Moe Htet sent you a friend request.
          </Typography>
          <Typography style={{ color: '#7d7d7d' }}>3 mins ago.</Typography>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} style={{ whiteSpace: 'normal' }}>
        <Avatar
          src={avatar}
          style={{ marginRight: 10, alignSelf: 'flex-start' }}
        >
          {username[0].toUpperCase()}
        </Avatar>
        <Box>
          <Typography style={{}}>
            Han Moe Htet sent you a friend request.Han Moe Htet sent you a
            friend request.Han Moe Htet sent you a friend request.Han Moe Htet
            sent you a friend request.Han Moe Htet sent you a friend request.Han
            Moe Htet sent you a friend request.
          </Typography>
          <Typography style={{ color: '#7d7d7d' }}>3 mins ago.</Typography>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} style={{ whiteSpace: 'normal' }}>
        <Avatar
          src={avatar}
          style={{ marginRight: 10, alignSelf: 'flex-start' }}
        >
          {username[0].toUpperCase()}
        </Avatar>
        <Box>
          <Typography style={{}}>
            Han Moe Htet sent you a friend request.Han Moe Htet sent you a
            friend request.Han Moe Htet sent you a friend request.Han Moe Htet
            sent you a friend request.Han Moe Htet sent you a friend request.Han
            Moe Htet sent you a friend request.
          </Typography>
          <Typography style={{ color: '#7d7d7d' }}>3 mins ago.</Typography>
        </Box>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <IconButton
        aria-label="show new notifications"
        aria-controls={menuId}
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenuOpen}
      >
        <Badge badgeContent={0} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {renderSettings}
    </>
  );
};

export default NotificationsIconButton;
