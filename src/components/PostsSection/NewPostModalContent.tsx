import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
  ClickAwayListener,
  Button,
} from '@material-ui/core';
import {
  Close,
  Public,
  People,
  Lock,
  VideoLibrary,
  Videocam,
  Image,
} from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { ModalContext } from 'src/composables/AppModal';
import avatarImg from 'src/assets/images/avatar2.png';

const useStyles = makeStyles((theme) => ({
  root: {
    // border: 'none',
    padding: 0,

    '& .MuiOutlinedInput-multiline': {
      padding: 0,
    },

    '& fieldset': {
      border: 'none',
    },

    '& textarea': {
      cursor: 'auto',

      '&::-webkit-scrollbar': {
        display: 'block',
        width: 8,
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

const NewPostModalContent = React.forwardRef(() => {
  const classes = useStyles();

  const { setContent } = useContext(ModalContext);
  const [privacy, setPrivacy] = useState('public');

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <ClickAwayListener
        onClickAway={() => setContent(null)}
        // mouseEvent="onMouseUp"
      >
        <Card style={{ width: '512px' }}>
          <CardHeader
            style={{ textAlign: 'center', padding: '10px 5px' }}
            title="Create post"
            action={
              <IconButton aria-label="close" onClick={() => setContent(null)}>
                <Close />
              </IconButton>
            }
          />
          <Divider style={{ margin: '0 16px' }} />
          <CardContent>
            <Box display="flex" alignItems="center">
              <Avatar src={avatarImg} style={{ marginRight: 5 }} />
              <Box flexGrow="1">
                <Typography>Han Moe Htet</Typography>
              </Box>
              <Select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value as string)}
                style={{ minWidth: '100px' }}
                MenuProps={{ disablePortal: true }}
              >
                <MenuItem value={'public'}>
                  <Box display="flex" alignItems="center">
                    <Public fontSize="small" style={{ marginRight: 5 }} />
                    <Typography>Public</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value={'friends'}>
                  <Box display="flex" alignItems="center">
                    <People fontSize="small" style={{ marginRight: 5 }} />
                    <Typography>Friends</Typography>
                  </Box>
                </MenuItem>
                <MenuItem value={'only_me'}>
                  <Box display="flex" alignItems="center">
                    <Lock fontSize="small" style={{ marginRight: 5 }} />
                    <Typography>Only me</Typography>
                  </Box>
                </MenuItem>
              </Select>
            </Box>
            <Box marginY="15px">
              <TextField
                multiline
                rows={4}
                maxRows={15}
                variant="outlined"
                style={{ width: '100%' }}
                placeholder="Hello, world!"
                classes={{
                  root: classes.root,
                }}
                autoFocus
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" marginY="5px">
              <IconButton>
                <VideoLibrary
                  style={{
                    color: '#52bd62',
                  }}
                />
              </IconButton>
              <IconButton>
                <Image
                  style={{
                    color: '#1877f2',
                  }}
                />
              </IconButton>
            </Box>
            <Button fullWidth size="large" variant="contained" color="primary">
              Post
            </Button>
          </CardContent>
        </Card>
      </ClickAwayListener>
    </Box>
  );
});

export default NewPostModalContent;
