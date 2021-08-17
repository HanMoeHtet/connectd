import { Button, Divider, Menu, MenuItem, Typography } from '@material-ui/core';
import { Share, Edit, Facebook } from '@material-ui/icons';
import React, { useContext } from 'react';
import { ModalContext } from 'src/composables/AppModal';
import { showToast } from 'src/services/notification';
import { createShare } from 'src/services/post';
import { useAppDispatch } from 'src/store';
import { addCreatedPost } from 'src/store/posts';
import { Privacy } from 'src/types/post';
import NewPostModalContent from './NewPostModalContent';

interface ShareButtonProps {
  count: number;
  postId: string;
}
const ShareButton: React.FC<ShareButtonProps> = ({ count, postId }) => {
  const dispatch = useAppDispatch();

  const { setContent } = useContext(ModalContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onShareNowClicked = async () => {
    try {
      const response = await createShare(postId, {
        privacy: Privacy.PUBLIC,
        content: '',
      });
      const { post } = response.data.data;
      await dispatch(addCreatedPost(post));
      // FIXME: translate the string
      showToast('success', `You've have shared a post.`);
    } catch (e) {
    } finally {
      handleMenuClose();
    }
  };

  const onWritePostClicked = () => {
    setContent(<NewPostModalContent sourceId={postId} />);
    handleMenuClose();
  };

  const menuId = 'share-menu';

  const renderSettings = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={onShareNowClicked}>
        <Share style={{ marginRight: 5 }} />
        <Typography>Share now</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onWritePostClicked}>
        <Edit style={{ marginRight: 5 }} />
        <Typography>Write post</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <Facebook style={{ marginRight: 5 }} />
        <Typography>Share on facebook</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Button
        style={{ padding: '5px 10px' }}
        aria-label="more settings"
        aria-haspopup="true"
        aria-controls={menuId}
        color="inherit"
        onClick={handleMenuOpen}
      >
        <Share style={{ marginRight: 10 }} />
        <Typography>{count}</Typography>
      </Button>
      {renderSettings}
    </>
  );
};

export default ShareButton;
