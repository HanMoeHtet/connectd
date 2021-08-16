import { Box, Button, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { ModalContext } from 'src/composables/AppModal';
import { ReactionType } from 'src/types/post';
import ReactionsInReply from './ReactionsInReply';
import { reactionIcons } from './shared';

interface ReactionsButtonProps {
  fontSize?: 'default' | 'inherit' | 'large' | 'medium' | 'small';
  counts: {
    [key in ReactionType]: number;
  };
  postId: string;
  commentId: string;
  replyId: string;
}

const MAX_REACTION_SIZE = 3;

const ReactionsInReplyButton: React.FC<ReactionsButtonProps> = ({
  fontSize,
  counts,
  postId,
  commentId,
  replyId,
}) => {
  const { setContent } = useContext(ModalContext);

  const renderReactions = () => {
    const sortedReactionKeyValuePairs = Array.from(Object.entries(counts))
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_REACTION_SIZE);

    const reactionComponents: JSX.Element[] = [];

    sortedReactionKeyValuePairs.forEach(([reactionType, count]) => {
      if (count) {
        const value = reactionIcons.get(reactionType as ReactionType)!;
        const reaction = (
          <value.Icon
            key={reactionType}
            fontSize={fontSize}
            style={{
              color: value.color,
            }}
          />
        );
        reactionComponents.push(reaction);
      }
    });

    return reactionComponents;
  };

  const totalReactions = Object.values(counts).reduce(
    (acc, curr) => acc + curr,
    0
  );

  if (totalReactions === 0) return null;

  return (
    <Button
      onClick={() =>
        setContent(
          <ReactionsInReply
            commentId={commentId}
            postId={postId}
            replyId={replyId}
            counts={counts}
          />
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

export default ReactionsInReplyButton;
