import {
  Box,
  Button,
  IconButton,
  Popover,
  makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import { ReactionType, UpdatedFieldsInPost } from 'src/types/post';
import { reactionIcons } from './shared';
import { addReactionToPost, removeReactionFromPost } from 'src/services/post';

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
  postId: string;
  onUpdate: (id: string, updatedPost: UpdatedFieldsInPost) => void;
}

const ReactButton: React.FC<ReactButtonProps> = ({
  fontSize,
  userReactedReactionType,
  postId,
  onUpdate,
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  let interval: NodeJS.Timeout;
  const id = 'react-button';

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    interval = setTimeout(() => {
      console.log(target);
      setAnchorEl(target);
    }, MOUSE_OVER_DELAY);
  };

  const handleClose = () => {
    setAnchorEl(null);
    clearTimeout(interval);
  };

  const onDefaultReactButtonClicked = () => {
    handleClose();
    if (!userReactedReactionType) {
      addReactionToPost({ postId, type: defaultReactionType }).then(
        ({ data }) => {
          const { post } = data.data;
          onUpdate(postId, post);
        }
      );
      onUpdate(postId, { userReactedReactionType: defaultReactionType });
    } else {
      removeReactionFromPost({ postId }).then(({ data }) => {
        const { post } = data.data;
        onUpdate(postId, post);
      });
      onUpdate(postId, { userReactedReactionType: undefined });
    }
  };

  const onReactButtonClicked = (type: ReactionType) => () => {
    handleClose();
    addReactionToPost({ postId, type }).then(({ data }) => {
      const { post } = data.data;
      onUpdate(postId, post);
    });
    onUpdate(postId, { userReactedReactionType: type });
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
