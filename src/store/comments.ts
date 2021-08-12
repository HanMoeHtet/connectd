import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from 'src/services/comment';
import { CommentsState } from 'src/types';
import { UpdatedFieldsInComment } from 'src/types/post';
import { AppThunk } from '.';

const initialState: CommentsState = {
  comments: new Map<string, Comment[]>(),
};

const postsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(
      state,
      action: PayloadAction<{ postId: string; comments: Comment[] }>
    ) {
      const { postId, comments } = action.payload;
      state.comments.set(postId, comments);
    },
  },
});

export const { setComments } = postsSlice.actions;

export const updateComment =
  (
    updatedCommentId: string,
    updatedPostId: string,
    updatedFieldsInComment: UpdatedFieldsInComment
  ): AppThunk =>
  async (dispatch, getState) => {
    const { comments } = getState().commentsStore;
    dispatch(
      setComments({
        postId: updatedPostId,
        comments: (comments.get(updatedPostId) || []).map((comment) => {
          if (comment._id === updatedCommentId) {
            return { ...comment, ...updatedFieldsInComment };
          }
          return comment;
        }),
      })
    );
  };

export default postsSlice.reducer;
