import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostsState } from 'src/types';
import { Post, UpdatedFieldsInPost } from 'src/types/post';
import { AppThunk } from '.';

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
  },
});

export const { setPosts } = postsSlice.actions;

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

export default postsSlice.reducer;
