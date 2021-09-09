import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PostComponent from 'src/components/PostsSection/Post';
import ShareComponent from 'src/components/PostsSection/Share';
import Main from 'src/layouts/Main';
import { getPost } from 'src/services/post';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectPost, setPosts } from 'src/store/posts';
import { PostType } from 'src/types/post';

interface PostPageParams {
  postId?: string;
}

const PostPage: React.FC = () => {
  const { postId } = useParams<PostPageParams>();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const post = useAppSelector((state) => {
    if (!postId) return null;
    return selectPost(postId)(state);
  });

  useEffect(() => {
    (async () => {
      if (!postId) {
        history.push('/');
      } else {
        const response = await getPost(postId);
        const { post } = response.data.data;
        dispatch(setPosts([post]));
      }
    })();
  }, [postId, history, dispatch]);

  if (!post) return null;

  return (
    <Box width="512px" margin="auto" padding="15px 0">
      {post.type === PostType.POST ? (
        <PostComponent {...post} />
      ) : (
        <ShareComponent {...post} />
      )}
    </Box>
  );
};

export default PostPage;
