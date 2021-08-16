import {
  Avatar,
  Box,
  CardContent,
  IconButton,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { Image, Send, VideoLibrary } from '@material-ui/icons';
import React, { useState } from 'react';
import avatarImg from 'src/assets/images/avatar2.png';
import { createComment } from 'src/services/comment';
import { useAppDispatch } from 'src/store';
import { addCreatedComment, updatePost } from 'src/store/posts';
import useAuth from 'src/composables/useAuth';

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

interface CommentEditorProps {
  postId: string;
}

const CommentEditor: React.FC<CommentEditorProps> = ({ postId }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { profile } = useAuth();

  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!profile) return null;

  const { avatar, username } = profile;

  const onFormSubmitted = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await createComment(postId, { content });
      const { post, comment: createdComment } = response.data.data;
      await dispatch(addCreatedComment(postId, createdComment));
      dispatch(updatePost(postId, post));
      setContent('');
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardContent style={{ paddingBottom: 0 }}>
      <Box display="flex" alignItems="center">
        <Avatar src={avatar} style={{ alignSelf: 'flex-start' }}>
          {username[0].toUpperCase()}
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
            <Box display="flex" justifyContent="flex-end">
              <Box>
                <IconButton
                  type="submit"
                  disabled={isLoading || content.length === 0}
                >
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
          </form>
        </CardContent>
      </Box>
    </CardContent>
  );
};

export default CommentEditor;
