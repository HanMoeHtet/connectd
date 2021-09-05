import {
  alpha,
  Box,
  InputBase,
  makeStyles,
  Popover,
  Typography,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },

  menu: {
    width: '300px',
    marginTop: '3px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

const SearchBar: React.FC = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'search-result-menu';

  const renderSearchResult = (
    <Popover
      id={menuId}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handleMenuClose}
      classes={{ paper: classes.menu }}
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
    >
      <Box padding={1}>
        <Typography>No recent searches.</Typography>
      </Box>
    </Popover>
  );

  return (
    <Box className={`${classes.search}`} display={{ xs: 'none', md: 'block' }}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        aria-label="Search"
        aria-controls={menuId}
        aria-haspopup="true"
        placeholder="Search"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onFocus={handleMenuOpen}
      />
      {renderSearchResult}
    </Box>
  );
};

export default SearchBar;
