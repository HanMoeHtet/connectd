import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import React from 'react';

export interface MultiActionsButtonProps {
  icon: React.ReactElement | null;
  text: string;
  actions: {
    icon: React.ReactElement | null;
    text: string;
    onClick: () => void;
  }[];
}
const MultiActionsButton: React.FC<MultiActionsButtonProps> = ({
  actions,
  icon,
  text,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    console.log('opened');
    setAnchorEl(event.currentTarget);
    document.addEventListener('scroll', handleMenuClose);
  };

  const handleMenuClose = () => {
    console.log('closed');
    setAnchorEl(null);
    document.removeEventListener('scroll', handleMenuClose);
  };

  const menuId = 'multi-actions-menu';

  const renderSettings = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      getContentAnchorEl={null}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      container={anchorEl?.parentElement}
    >
      {actions.map((action, index) => [
        <MenuItem onClick={action.onClick}>
          {action.icon}
          <Box width="5px" />
          <Typography style={{ textTransform: 'none' }}>
            {action.text}
          </Typography>
        </MenuItem>,
        index !== actions.length - 1 && <Divider />,
      ])}
    </Menu>
  );

  return (
    <Box>
      <Button
        style={{
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
        aria-label={text}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={handleMenuOpen}
        variant="contained"
        color="primary"
      >
        {icon}
        <Box width="8px"></Box>
        <Typography>{text}</Typography>
      </Button>
      {renderSettings}
    </Box>
  );
};

export default MultiActionsButton;
