import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from 'src/services/comment';
import { Reply } from 'src/services/reply';
import { PostsState } from 'src/types';
import {
  Post,
  UpdatedFieldsInComment,
  UpdatedFieldsInPost,
  UpdatedFieldsInReply,
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
    setReplies(
      state,
      action: PayloadAction<{
        commentId: string;
        postId: string;
        replies: Reply[];
      }>
    ) {
      const { commentId, postId, replies } = action.payload;
      state.posts.forEach((post) => {
        if (post._id === postId) {
          post.comments?.forEach((comment) => {
            if (comment._id === commentId) {
              comment.replies = replies;
            }
          });
        }
      });
    },
  },
});

export const selectComments = (postId: string) => (state: RootState) => {
  const post = state.postsStore.posts.find((post) => post._id === postId);
  return post?.comments || [];
};

export const selectReplies =
  (commentId: string, postId: string) => (state: RootState) => {
    const post = state.postsStore.posts.find((post) => post._id === postId);
    return (
      post?.comments?.find((comment) => comment._id === commentId)?.replies ||
      []
    );
  };

export const { setPosts, setComments, setReplies } = postsSlice.actions;

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

export const updateReply =
  (
    updatedReplyId: string,
    updatedCommentId: string,
    updatedPostId: string,
    updatedReply: UpdatedFieldsInReply
  ): AppThunk =>
  async (dispatch, getState) => {
    const { posts } = getState().postsStore;
    const post = posts.find((post) => post._id === updatedPostId);
    console.log(updatedReplyId, updatedCommentId, updatedPostId);
    console.log(post);
    if (post && post.comments) {
      const comment = post.comments.find(
        (comment) => comment._id === updatedCommentId
      );
      console.log(comment);
      if (comment && comment.replies) {
        dispatch(
          setReplies({
            commentId: updatedCommentId,
            postId: updatedPostId,
            replies: comment.replies.map((reply) => {
              if (reply._id === updatedReplyId) {
                return { ...reply, ...updatedReply };
              }
              return reply;
            }),
          })
        );
      }
    }
  };

export const addCreatedPost =
  (createdPost: Post): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const { posts } = getState().postsStore;
    dispatch(setPosts([createdPost, ...posts]));
  };

export const addCreatedComment =
  (postId: string, createdComment: Comment): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const { posts } = getState().postsStore;
    const post = posts.find((post) => post._id === postId);

    if (post) {
      dispatch(
        setComments({
          postId,
          comments: [...(post.comments || []), createdComment],
        })
      );
    }
  };

export const addCreatedReply =
  (
    commentId: string,
    postId: string,
    createdReply: Reply
  ): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const { posts } = getState().postsStore;
    const post = posts.find((post) => post._id === postId);
    if (post && post.comments) {
      const comment = post.comments.find(
        (comment) => comment._id === commentId
      );
      if (comment) {
        dispatch(
          setReplies({
            commentId,
            postId,
            replies: [...(comment.replies || []), createdReply],
          })
        );
      }
    }
  };

export default postsSlice.reducer;
