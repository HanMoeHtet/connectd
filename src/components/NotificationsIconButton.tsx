import { Badge, IconButton, makeStyles, Menu } from '@material-ui/core';
import { Notifications as NotificationsIcon } from '@material-ui/icons';
import React from 'react';
import { useAppSelector } from 'src/store';
import Notifications from './Notifications';

const useStyles = makeStyles((theme) => ({
  menu: {
    width: 500,
    minHeight: '50vh',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },

    '&::-webkit-scrollbar': {
      display: 'block',
      width: 8,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const NotificationsIconButton: React.FC = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { newNotificationsCount } = useAppSelector(
    (state) => state.notificationsStore
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'notificatinos-menu';

  return (
    <>
      <IconButton
        aria-label="show notifications"
        aria-controls={menuId}
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenuOpen}
      >
        <Badge badgeContent={newNotificationsCount} max={9} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        classes={{ paper: classes.menu }}
        getContentAnchorEl={null}
      >
        {Boolean(anchorEl) && <Notifications />}
      </Menu>
    </>
  );
};

export default NotificationsIconButton;
