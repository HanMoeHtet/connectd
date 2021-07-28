import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import { Videocam, Image, VideoLibrary } from '@material-ui/icons';
import React, { useContext } from 'react';
import avatarImg from 'src/assets/images/avatar2.png';
import { ModalContext } from 'src/composables/AppModal';
import NewPostModalContent from './NewPostModalContent';

const NewPostSection: React.FC = () => {
  const { setContent } = useContext(ModalContext);

  return (
    <Card>
      <CardContent style={{ paddingBottom: 10 }}>
        <Box display="flex" alignItems="center">
          <Avatar src={avatarImg} />
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
            <Typography>What's on your mind, Han Moe Htet?</Typography>
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
