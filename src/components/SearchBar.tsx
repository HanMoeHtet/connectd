import {
  alpha,
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  makeStyles,
} from '@material-ui/core';
import { ArrowForward, Search as SearchIcon } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
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
  const history = useHistory();

  const [text, setText] = React.useState('');

  const isButtonDisabled = () => {
    if (text.length === 0) {
      return true;
    }

    return false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isButtonDisabled()) {
      goToSearch();
    }
  };

  const goToSearch = async () => {
    history.push({
      pathname: '/search',
      search: `?q=${text}`,
    });
    setText('');
  };

  return (
    <Box className={`${classes.search}`} display={{ xs: 'none', md: 'block' }}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        aria-label="Search"
        aria-haspopup="true"
        placeholder="Search"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onKeyDown={handleKeyDown}
        value={text}
        onChange={(e) => setText(e.target.value)}
        endAdornment={
          isButtonDisabled() ? undefined : (
            <InputAdornment position="end">
              <IconButton aria-label="search" size="small" onClick={goToSearch}>
                <ArrowForward />
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </Box>
  );
};

export default SearchBar;
