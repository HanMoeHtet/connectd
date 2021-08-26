import {
  Avatar,
  Box,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import React, { useState } from 'react';
import useAuth from 'src/composables/useAuth';
import { createReply } from 'src/services/reply';
import { useAppDispatch } from 'src/store';
import { addCreatedReply, updateComment } from 'src/store/posts';
import { isImage, isVideo } from 'src/utils/media-type';
import PhotoInputButton from './PhotoInputButton';
import VideoInputButton from './VideoInputButton';

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

interface ReplyEditorProps {
  commentId: string;
  postId: string;
}

const ReplyEditor: React.FC<ReplyEditorProps> = ({ commentId, postId }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { profile } = useAuth();

  const [content, setContent] = useState('');
  const [media, setMedia] = useState<File | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

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

  const { avatar, username } = profile;

  const onFormSubmitted = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await createReply(commentId, { content, media });
      const { comment, reply: createdReply } = response.data.data;
      await dispatch(addCreatedReply(commentId, postId, createdReply));
      dispatch(updateComment(commentId, postId, comment));
      setContent('');
      setMedia(undefined);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = () => {
    if (isLoading) return true;

    if (content.length === 0 && !media) return true;

    return false;
  };

  return (
    <CardContent style={{ paddingBottom: 0 }}>
      <Box display="flex" alignItems="center">
        <Avatar src={avatar} style={{ alignSelf: 'flex-start' }}>
          {(username[0] || '').toUpperCase()}
        </Avatar>
        <CardContent style={{ flexGrow: 1, paddingTop: 0, paddingBottom: 0 }}>
          <form onSubmit={onFormSubmitted}>
            <TextField
              multiline
              variant="outlined"
              minRows={2}
              maxRows={10}
              classes={{
                root: classes.root,
              }}
              style={{ width: '100%' }}
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
            <Box display="flex" justifyContent="flex-end">
              <Box>
                <IconButton type="submit" disabled={isButtonDisabled()}>
                  <Send
                    style={
                      !isButtonDisabled()
                        ? {
                            color: '#9c27b0',
                          }
                        : {}
                    }
                  />
                </IconButton>
              </Box>
              <Box justifySelf="flex-end">
                <VideoInputButton onChange={(media) => setMedia(media)} />
                <PhotoInputButton onChange={(media) => setMedia(media)} />
              </Box>
            </Box>
          </form>
        </CardContent>
      </Box>
    </CardContent>
  );
};

export default ReplyEditor;
