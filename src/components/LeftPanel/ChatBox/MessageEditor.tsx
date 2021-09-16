import { Box, IconButton, makeStyles, TextField } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import * as React from 'react';
import { createMessageInConversation } from 'src/services/conversation';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  addNewMessage,
  selectCurrentConversation,
} from 'src/store/conversations';

const useStyles = makeStyles((theme) => ({
  textarea: {
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
        width: 0,
      },
    },
  },
}));

interface MessageEditorProps {}

const MessageEditor: React.FC<MessageEditorProps> = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [content, setContent] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const conversation = useAppSelector(selectCurrentConversation());

  const isButtonDisabled = () => {
    if (isLoading) return true;

    if (content.length === 0) return true;

    return false;
  };

  const onFormSubmitted = async (e: React.FormEvent) => {
    e.preventDefault();

    if (conversation) {
      setIsLoading(true);
      const response = await createMessageInConversation({
        conversationId: conversation._id,
        content,
      });
      const { message } = response.data.data;
      dispatch(addNewMessage(conversation._id, message));
      setContent('');
      setIsLoading(false);
    }
  };

  return (
    <Box padding="10px">
      <form onSubmit={onFormSubmitted}>
        <Box display="flex" alignItems="center">
          <TextField
            multiline
            variant="outlined"
            minRows={2}
            maxRows={3}
            classes={{
              root: classes.textarea,
            }}
            style={{ width: '100%' }}
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

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
      </form>
    </Box>
  );
};

export default MessageEditor;
