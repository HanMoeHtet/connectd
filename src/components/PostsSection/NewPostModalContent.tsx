import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  ClickAwayListener,
  Divider,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { Close, Lock, People, Public } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { ModalContext } from 'src/composables/AppModal';
import useAuth from 'src/composables/useAuth';
import { showToast } from 'src/services/notification';
import { createPost, createShare } from 'src/services/post';
import { useAppDispatch, useAppSelector } from 'src/store';
import { addCreatedPost, selectPost } from 'src/store/posts';
import { Privacy } from 'src/types/post';
import { isImage, isVideo } from 'src/utils/media-type';
import PhotoInputButton from './PhotoInputButton';
import SourcePost from './SourcePost';
import VideoInputButton from './VideoInputButton';

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
  isChoosingVideo?: boolean;
  isChoosingPhoto?: boolean;
}
const NewPostModalContent: React.FC<NewPostModalContentProps> =
  React.forwardRef(({ sourceId, isChoosingPhoto, isChoosingVideo }, ref) => {
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
    const [media, setMedia] = useState<File | undefined>(undefined);

    const renderMedia = React.useMemo(() => {
      if (!media) return null;

      if (isImage(media.type)) {
        return <CardMedia src={URL.createObjectURL(media)} component="img" />;
      }

      if (isVideo(media.type)) {
        return (
          <CardMedia
            src={URL.createObjectURL(media)}
            component="video"
            controls
          />
        );
      }

      return null;
    }, [media]);

    if (!profile) return null;

    const { username, avatar } = profile;

    const onFormSubmitted = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = sourceId
          ? await createShare(sourceId, { content, privacy, media })
          : await createPost({ content, privacy, media });
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

    const isButtonDisabled = () => {
      if (isLoading) return true;

      if (sourceId) return false;

      if (content.length === 0 && !media) return true;

      return false;
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
                    {(username[0] || '').toUpperCase()}
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
                  {media && (
                    <>
                      <Box height="15px" />
                      {renderMedia}
                    </>
                  )}
                  {source && (
                    <>
                      <Box height="15px" />
                      <SourcePost {...source} />
                    </>
                  )}
                </Box>
                <Box display="flex" justifyContent="flex-end" marginY="5px">
                  <VideoInputButton
                    isOpen={isChoosingVideo}
                    onChange={(media) => setMedia(media)}
                  />
                  <PhotoInputButton
                    isOpen={isChoosingPhoto}
                    onChange={(media) => setMedia(media)}
                  />
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                  disabled={isButtonDisabled()}
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
