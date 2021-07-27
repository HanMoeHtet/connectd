import { Box, IconButton } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import React from 'react';

const SearchIconButton: React.FC = () => {
  return (
    <Box display={{ xs: 'block', md: 'none' }}>
      <IconButton
        aria-label="show 17 new notifications"
        aria-haspopup="true"
        color="inherit"
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchIconButton;
