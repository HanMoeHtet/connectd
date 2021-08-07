import { Box, Button, Typography } from '@material-ui/core';
import {
  Favorite,
  SentimentVerySatisfied,
  SentimentDissatisfied,
} from '@material-ui/icons';
import React, { useContext } from 'react';
import { ModalContext } from 'src/composables/AppModal';
import { ReactionType } from 'src/types/post';
import Reactions from './Reactions';
import { reactionIcons } from './shared';

interface ReactionsButtonProps {
  fontSize?: 'default' | 'inherit' | 'large' | 'medium' | 'small';
  counts: {
    [key in ReactionType]: number;
  };
}

const MAX_REACTION_SIZE = 3;

const ReactionsButton: React.FC<ReactionsButtonProps> = ({
  fontSize,
  counts,
}) => {
  const { setContent } = useContext(ModalContext);

  const renderReactions = () => {
    const sortedReactionKeyValuePairs = Array.from(Object.entries(counts))
      .sort((a, b) => a[1] - b[1])
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
    <Button onClick={() => setContent(<Reactions />)}>
      <Box display="flex" style={{ marginRight: 5 }}>
        {renderReactions()}
      </Box>
      <Typography>{totalReactions}</Typography>
    </Button>
  );
};

export default ReactionsButton;
