import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Modal,
  makeStyles,
  alpha,
  Paper,
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
    width: '100%',
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

const SearchIconButton: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [isOpen, setIsOpen] = React.useState(false);
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
    setText('');
    handleClose();
    history.push({
      pathname: '/search',
      search: `?q=${text}`,
    });
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box display={{ xs: 'block', md: 'none' }}>
      <IconButton
        onClick={handleOpen}
        aria-label="search"
        aria-haspopup="true"
        color="inherit"
      >
        <SearchIcon />
      </IconButton>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="search-modal-title"
        aria-describedby="search-modal-description"
      >
        <Paper style={{ margin: 10 }}>
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
                  <IconButton
                    aria-label="search"
                    size="small"
                    onClick={goToSearch}
                  >
                    <ArrowForward />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </Paper>
      </Modal>
    </Box>
  );
};

export default SearchIconButton;
