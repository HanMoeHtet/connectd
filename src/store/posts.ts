import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Comment } from 'src/services/comment';
import { PostsState } from 'src/types';
import {
  Post,
  UpdatedFieldsInComment,
  UpdatedFieldsInPost,
} from 'src/types/post';
import { AppThunk, RootState } from '.';

const initialState: PostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    setComments(
      state,
      action: PayloadAction<{ postId: string; comments: Comment[] }>
    ) {
      const { postId, comments } = action.payload;
      state.posts.forEach((post) => {
        if (post._id === postId) {
          post.comments = comments;
        }
      });
    },
  },
});

export const selectComments = (postId: string) => (state: RootState) => {
  const post = state.postsStore.posts.find((post) => post._id === postId);
  return post?.comments ? post.comments : [];
};

export const { setPosts, setComments } = postsSlice.actions;

export const updatePost =
  (updatedPostId: string, updatedFieldsInPost: UpdatedFieldsInPost): AppThunk =>
  async (dispatch, getState) => {
    const { posts } = getState().postsStore;
    dispatch(
      setPosts(
        posts.map((post) => {
          if (post._id === updatedPostId) {
            return { ...post, ...updatedFieldsInPost };
          }
          return post;
        })
      )
    );
  };

export const updateComment =
  (
    updatedCommentId: string,
    updatedPostId: string,
    updatedFieldsInComment: UpdatedFieldsInComment
  ): AppThunk =>
  async (dispatch, getState) => {
    const { posts } = getState().postsStore;
    const post = posts.find((post) => post._id === updatedPostId);

    if (post && post.comments) {
      dispatch(
        setComments({
          postId: updatedPostId,
          comments: post.comments.map((comment) => {
            if (comment._id === updatedCommentId) {
              return { ...comment, ...updatedFieldsInComment };
            }
            return comment;
          }),
        })
      );
    }
  };

export default postsSlice.reducer;
