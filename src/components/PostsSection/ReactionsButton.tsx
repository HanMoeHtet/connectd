import { Box, Button, Typography } from '@material-ui/core';
import {
  Favorite,
  SentimentVerySatisfied,
  SentimentDissatisfied,
} from '@material-ui/icons';
import React, { useContext } from 'react';
import { ModalContext } from 'src/composables/AppModal';
import { ReactionType, UpdatedFieldsInPost } from 'src/types/post';
import Reactions from './Reactions';
import { reactionIcons } from './shared';

interface ReactionsButtonProps {
  fontSize?: 'default' | 'inherit' | 'large' | 'medium' | 'small';
  counts: {
    [key in ReactionType]: number;
  };
  postId: string;
  onUpdate: (postId: string, updatedFieldsInPost: UpdatedFieldsInPost) => void;
}

const MAX_REACTION_SIZE = 3;

const ReactionsButton: React.FC<ReactionsButtonProps> = ({
  fontSize,
  counts,
  postId,
  onUpdate,
}) => {
  const { setContent } = useContext(ModalContext);

  const renderReactions = () => {
    const sortedReactionKeyValuePairs = Array.from(Object.entries(counts))
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_REACTION_SIZE);

    const reactionComponents: JSX.Element[] = [];

    sortedReactionKeyValuePairs.forEach(([reactionType]) => {
      const value = reactionIcons.get(reactionType as ReactionType)!;
      const reaction = (
        <value.Icon
          fontSize={fontSize}
          style={{
            color: value.color,
          }}
        />
      );
      reactionComponents.push(reaction);
    });

    return reactionComponents;
  };

  const totalReactions = Object.values(counts).reduce(
    (acc, curr) => acc + curr,
    0
  );

  return (
    <Button
      onClick={() =>
        setContent(
          <Reactions postId={postId} onUpdate={onUpdate} counts={counts} />
        )
      }
    >
      <Box display="flex" style={{ marginRight: 5 }}>
        {renderReactions()}
      </Box>
      <Typography>{totalReactions}</Typography>
    </Button>
  );
};

export default ReactionsButton;
