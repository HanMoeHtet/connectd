import {
  Avatar,
  Box,
  CardContent,
  IconButton,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { Image, Send, VideoLibrary } from '@material-ui/icons';
import React from 'react';
import avatarImg from 'src/assets/images/avatar2.png';

const useStyles = makeStyles((theme) => ({
  root: {
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

const CommentEditor: React.FC = () => {
  const classes = useStyles();

  return (
    <CardContent style={{ paddingBottom: 0 }}>
      <Box display="flex" alignItems="center">
        <Avatar src={avatarImg} style={{ alignSelf: 'flex-start' }} />
        <CardContent style={{ flexGrow: 1, paddingTop: 0, paddingBottom: 0 }}>
          <TextField
            multiline
            variant="outlined"
            placeholder="Hello, world!"
            minRows={2}
            maxRows={10}
            classes={{
              root: classes.root,
            }}
            style={{ width: '100%' }}
            autoFocus
          />
          <Box display="flex" justifyContent="flex-end">
            <Box>
              <IconButton>
                <Send
                  style={{
                    color: '#9c27b0',
                  }}
                />
              </IconButton>
            </Box>
            <Box justifySelf="flex-end">
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
          </Box>
        </CardContent>
      </Box>
    </CardContent>
  );
};

export default CommentEditor;
