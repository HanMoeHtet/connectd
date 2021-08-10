import {
  Box,
  Button,
  IconButton,
  Popover,
  makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import {
  ReactionSourceType,
  ReactionType,
  UpdatedFieldsInPost,
} from 'src/types/post';
import { reactionIcons } from './shared';
import { addReactionToPost, removeReactionFromPost } from 'src/services/post';
import { useAppDispatch } from 'src/store';
import { updatePost } from 'src/store/posts';

const MOUSE_OVER_DELAY = 400;

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },

  paper: {
    pointerEvents: 'auto',
  },
}));

interface ReactButtonProps {
  fontSize?: 'default' | 'inherit' | 'large' | 'medium' | 'small';
  userReactedReactionType?: ReactionType;
  sourceId: string;
  sourceType: ReactionSourceType;
}

const ReactButton: React.FC<ReactButtonProps> = ({
  fontSize,
  userReactedReactionType,
  sourceId,
  sourceType,
}) => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  let interval: NodeJS.Timeout;
  const id = 'react-button';

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    interval = setTimeout(() => {
      setAnchorEl(target);
    }, MOUSE_OVER_DELAY);
    document.addEventListener('scroll', handleClose);
  };

  const handleClose = () => {
    setAnchorEl(null);
    clearTimeout(interval);
    document.removeEventListener('scroll', handleClose);
  };

  const onDefaultReactButtonClicked = () => {
    handleClose();
    if (!userReactedReactionType) {
      if (sourceType === ReactionSourceType.POST) {
        addReactionToPost({ postId: sourceId, type: defaultReactionType }).then(
          ({ data }) => {
            const { post } = data.data;
            dispatch(updatePost(sourceId, post));
          }
        );
        dispatch(
          updatePost(sourceId, { userReactedReactionType: defaultReactionType })
        );
      }
    } else {
      if (sourceType === ReactionSourceType.POST) {
        removeReactionFromPost({ postId: sourceId }).then(({ data }) => {
          const { post } = data.data;
          dispatch(updatePost(sourceId, post));
        });
        dispatch(updatePost(sourceId, { userReactedReactionType: undefined }));
      }
    }
  };

  const onReactButtonClicked = (type: ReactionType) => () => {
    handleClose();
    if (sourceType === ReactionSourceType.POST) {
      addReactionToPost({ postId: sourceId, type }).then(({ data }) => {
        const { post } = data.data;
        dispatch(updatePost(sourceId, post));
      });
      dispatch(updatePost(sourceId, { userReactedReactionType: type }));
    }
  };

  const renderIconButtons = () => {
    const iconButtons: any[] = [];

    reactionIcons.forEach((value, key) => {
      const iconButton = (
        <IconButton
          onClick={onReactButtonClicked(key)}
          onMouseOver={() => setHoveredIcon(key)}
          key={key}
        >
          <value.Icon
            fontSize="small"
            style={{
              color: hoveredIcon === key ? value.color : undefined,
            }}
          />
        </IconButton>
      );
      iconButtons.push(iconButton);
    });

    return iconButtons;
  };

  const defaultReactionType = ReactionType.LIKE;

  const userReactedReaction = userReactedReactionType
    ? reactionIcons.get(userReactedReactionType)
    : reactionIcons.get(defaultReactionType);

  return (
    <Box onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <Button
        aria-describedby={Boolean(anchorEl) ? id : undefined}
        style={{ padding: '5px 10px' }}
        aria-haspopup={true}
        aria-owns={id}
        onClick={onDefaultReactButtonClicked}
      >
        {userReactedReaction && (
          <userReactedReaction.Icon
            fontSize={fontSize}
            style={{
              color: Boolean(userReactedReactionType)
                ? userReactedReaction.color
                : undefined,
            }}
          />
        )}
      </Button>
      <Popover
        id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        container={anchorEl?.parentElement}
      >
        <Box
          onMouseOut={() => {
            setHoveredIcon(null);
          }}
        >
          {renderIconButtons()}
        </Box>
      </Popover>
    </Box>
  );
};

export default ReactButton;
