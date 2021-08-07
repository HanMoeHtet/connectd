import { Box, Button, IconButton, Popover } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';
import React, { useState } from 'react';
import { reactionIcons } from './shared';

interface ReactButtonProps {
  fontSize?: 'default' | 'inherit' | 'large' | 'medium' | 'small';
}

const ReactButton: React.FC<ReactButtonProps> = ({ fontSize }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = 'react-button';

  const renderIconButtons = () => {
    const iconButtons: any[] = [];

    reactionIcons.forEach((value, key) => {
      const iconButton = (
        <IconButton onMouseOver={() => setHoveredIcon(key)} key={key}>
          <value.Icon
            fontSize="small"
            style={{
              color: hoveredIcon === key ? value.color : undefined,
            }}
          />
        </IconButton>
      );
      iconButtons.push(iconButton);
    });

    return iconButtons;
  };

  return (
    <>
      <Button
        aria-describedby={Boolean(anchorEl) ? id : undefined}
        style={{ padding: '5px 10px', cursor: 'default' }}
        aria-haspopup={true}
        onClick={handleOpen}
      >
        <ThumbUp fontSize={fontSize} />
      </Button>
      <Popover
        id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box onMouseOut={() => setHoveredIcon(null)}>{renderIconButtons()}</Box>
      </Popover>
    </>
  );
};

export default ReactButton;
