import { Button, Divider, Menu, MenuItem, Typography } from '@material-ui/core';
import { Share } from '@material-ui/icons';
import React from 'react';

interface ShareButtonProps {
  shareIds: string[];
}
const ShareButton: React.FC<ShareButtonProps> = ({ shareIds }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'share-menu';

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
      <MenuItem onClick={handleMenuClose}>hello</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>world</MenuItem>
    </Menu>
  );

  return (
    <>
      <Button
        style={{ padding: '5px 10px' }}
        aria-label="more settings"
        aria-haspopup="true"
        aria-controls={menuId}
        color="inherit"
        onClick={handleMenuOpen}
      >
        <Share style={{ marginRight: 10 }} />
        <Typography>{shareIds.length}</Typography>
      </Button>
      {renderSettings}
    </>
  );
};

export default ShareButton;
