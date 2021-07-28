import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Divider,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Close, Comment, ThumbUp } from '@material-ui/icons';
import React, { useContext } from 'react';
import { ModalContext } from 'src/composables/AppModal';
import avatarImg from 'src/assets/images/avatar2.png';
import ReactButton from './ReactButton';
import ReactionsButton from './ReactionsButton';
import RepliesButton from './RepliesButton';
import CommentComponent from './Comment';

const useStyles = makeStyles((theme) => ({
  container: {
    overflowY: 'auto',
    maxHeight: '80vh',

    '&::-webkit-scrollbar': {
      appearance: 'none',
      width: '8px',
    },

    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.primary.main,
    },
  },

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

const CommentsModalContent = () => {
  const { setContent } = useContext(ModalContext);

  const classes = useStyles();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <ClickAwayListener onClickAway={() => setContent(null)}>
        <Card style={{ width: '512px' }}>
          <CardHeader
            style={{
              textAlign: 'center',
              padding: '10px 5px',
            }}
            title="Comments"
            action={
              <IconButton aria-label="close" onClick={() => setContent(null)}>
                <Close />
              </IconButton>
            }
          />
          <Divider style={{ margin: '0 16px' }} />
          <Box className={`${classes.container}`}>
            <CommentComponent />
            <CommentComponent />
            <CommentComponent />
          </Box>
          <Box>
            <TextField
              multiline
              minRows={2}
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
        </Card>
      </ClickAwayListener>
    </Box>
  );
};

const CommentsButton: React.FC = () => {
  const { setContent } = useContext(ModalContext);

  return (
    <Button
      style={{ padding: '5px 10px' }}
      onClick={() => setContent(<CommentsModalContent />)}
    >
      <Comment style={{ marginRight: 10 }} />
      <Typography>300</Typography>
    </Button>
  );
};

export default CommentsButton;
