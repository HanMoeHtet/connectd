import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Divider,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  Close,
  Image,
  Lock,
  People,
  Public,
  VideoLibrary,
} from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { ModalContext } from 'src/composables/AppModal';
import useAuth from 'src/composables/useAuth';
import { showToast } from 'src/services/notification';
import { createPost, createShare } from 'src/services/post';
import { useAppDispatch, useAppSelector } from 'src/store';
import { addCreatedPost, selectPost } from 'src/store/posts';
import { Privacy } from 'src/types/post';
import SourcePost from './SourcePost';

const useStyles = makeStyles((theme) => ({
  content: {
    maxHeight: 240,
    overflowY: 'auto',

    '&::-webkit-scrollbar': {
      display: 'block',
      width: 8,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
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
  },
}));

interface NewPostModalContentProps {
  sourceId?: string;
}
const NewPostModalContent: React.FC<NewPostModalContentProps> =
  React.forwardRef(({ sourceId }) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const source = useAppSelector((state) =>
      sourceId === undefined ? undefined : selectPost(sourceId)(state)
    );

    const { profile } = useAuth();

    const { setContent: setModalContent } = useContext(ModalContext);

    const [isLoading, setIsLoading] = useState(false);
    const [privacy, setPrivacy] = useState<Privacy>(Privacy.PUBLIC);
    const [content, setContent] = useState('');

    if (!profile) return null;

    const { username, avatar } = profile;

    const onFormSubmitted = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = sourceId
          ? await createShare(sourceId, { content, privacy })
          : await createPost({ content, privacy });
        const { post: createdPost } = response.data.data;
        await dispatch(addCreatedPost(createdPost));
        setModalContent(null);
        sourceId
          ? showToast('success', `You've have shared a post.`)
          : showToast('success', `You've have created a post.`);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <ClickAwayListener onClickAway={() => setModalContent(null)}>
          <Card style={{ width: '512px' }}>
            <CardHeader
              style={{ textAlign: 'center', padding: '10px 5px' }}
              title="Create post"
              action={
                <IconButton
                  aria-label="close"
                  onClick={() => setModalContent(null)}
                >
                  <Close />
                </IconButton>
              }
            />
            <Divider style={{ margin: '0 16px' }} />
            <CardContent>
              <form onSubmit={onFormSubmitted}>
                <Box display="flex" alignItems="center">
                  <Avatar src={avatar} style={{ marginRight: 5 }}>
                    {username[0].toUpperCase()}
                  </Avatar>
                  <Box flexGrow="1">
                    <Typography>{username}</Typography>
                  </Box>
                  <Select
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value as Privacy)}
                    style={{ minWidth: '100px' }}
                    MenuProps={{ disablePortal: true }}
                  >
                    <MenuItem value={Privacy.PUBLIC}>
                      <Box display="flex" alignItems="center">
                        <Public fontSize="small" style={{ marginRight: 5 }} />
                        <Typography>Public</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value={Privacy.FRIENDS}>
                      <Box display="flex" alignItems="center">
                        <People fontSize="small" style={{ marginRight: 5 }} />
                        <Typography>Friends</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value={Privacy.ONLY_ME}>
                      <Box display="flex" alignItems="center">
                        <Lock fontSize="small" style={{ marginRight: 5 }} />
                        <Typography>Only me</Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </Box>
                <Box marginY="15px" className={classes.content}>
                  <TextField
                    multiline
                    minRows={4}
                    variant="outlined"
                    style={{ width: '100%' }}
                    classes={{
                      root: classes.root,
                    }}
                    autoFocus
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  {source && (
                    <>
                      <Box height="15px" /> <SourcePost {...source} />
                    </>
                  )}
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
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                  disabled={
                    isLoading || (source === undefined && content.length === 0)
                  }
                >
                  Post
                </Button>
              </form>
            </CardContent>
          </Card>
        </ClickAwayListener>
      </Box>
    );
  });

export default NewPostModalContent;
