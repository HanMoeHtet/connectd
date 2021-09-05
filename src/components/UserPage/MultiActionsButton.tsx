import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import React, { useRef } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    document.addEventListener('scroll', handleMenuClose);
  };

  const handleMenuClose = () => {
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
      container={containerRef.current}
    >
      {actions.map((action, index) => [
        <MenuItem
          onClick={() => {
            action.onClick();
          }}
        >
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
    <Box {...{ ref: containerRef }}>
      <Button
        style={{
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
        aria-label={text}
        aria-haspopup="true"
        aria-controls={menuId}
        aria-describedby={Boolean(anchorEl) ? menuId : undefined}
        aria-owns={menuId}
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
