import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';
import { Image, Videocam, VideoLibrary } from '@material-ui/icons';
import React, { useContext } from 'react';
import { ModalContext } from 'src/composables/AppModal';
import useAuth from 'src/composables/useAuth';
import NewPostModalContent from './NewPostModalContent';

const NewPostSection: React.FC = () => {
  const { setContent } = useContext(ModalContext);
  const { profile } = useAuth();

  if (!profile) return null;

  const { username, avatar } = profile;

  return (
    <Card>
      <CardContent style={{ paddingBottom: 10 }}>
        <Box display="flex" alignItems="center">
          <Avatar src={avatar}>{username[0].toUpperCase()}</Avatar>
          <Button
            color="inherit"
            style={{
              flexGrow: 1,
              margin: '0 10px',
              padding: '12px',
              borderRadius: 8,
              textTransform: 'none',
              justifyContent: 'flex-start',
            }}
            onClick={() => setContent(<NewPostModalContent />)}
          >
            <Typography>What's on your mind, {username}?</Typography>
          </Button>
        </Box>
        <Divider style={{ margin: '10px 0' }} />
        <Box display="flex">
          <Button
            style={{
              alignItems: 'center',
              textTransform: 'none',
              padding: '8px',
            }}
          >
            <Videocam style={{ color: '#f04149', marginRight: 10 }} />
            <Typography>Live</Typography>
          </Button>
          <Button
            style={{
              alignItems: 'center',
              textTransform: 'none',
              padding: '8px',
            }}
          >
            <VideoLibrary style={{ color: '#52bd62', marginRight: 10 }} />
            <Typography>Videos</Typography>
          </Button>
          <Button
            style={{
              alignItems: 'center',
              textTransform: 'none',
              padding: '8px',
            }}
          >
            <Image style={{ color: '#1877f2', marginRight: 10 }} />
            <Typography>Photos</Typography>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewPostSection;
