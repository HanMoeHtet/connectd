import { Box } from '@material-ui/core';
import React from 'react';
import Post from 'src/components/PostsSection/Post';
import Main from 'src/layouts/Main';
import { NormalPost, PostType, Privacy, ReactionType } from 'src/types/post';

const post: NormalPost = {
  _id: '123',
  userId: '123',
  type: PostType.POST,
  createdAt: new Date(),
  privacy: Privacy.PUBLIC,
  content: 'Hello, world!',
  reactionCounts: {
    LIKE: 0,
    FAVORITE: 0,
    SATISFIED: 0,
    DISSATISFIED: 0,
  },
  commentCount: 10,
  shareCount: 10,
  user: {
    _id: '123',
    username: 'Han Moe Htet',
    avatar: '',
  },
  userReactedReactionType: ReactionType.LIKE,
};

const PostPage: React.FC = () => {
  return (
    <Main>
      <Box width="512px" margin="auto" padding="15px 0">
        <Post {...post} />
      </Box>
    </Main>
  );
};

export default PostPage;
