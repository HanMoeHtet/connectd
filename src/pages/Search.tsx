import { Box, List, Typography } from '@material-ui/core';
import * as React from 'react';
import { useHistory, useLocation } from 'react-router';
import Share from 'src/components/PostsSection/Share';
import Post from 'src/components/PostsSection/Post';
import User from 'src/components/User';
import { search as _search, SearchResult } from 'src/services/search';
import { PostType } from 'src/types/post';

const Search: React.FC = () => {
  const { search } = useLocation();
  const history = useHistory();

  const [result, setResult] = React.useState<SearchResult>();

  React.useEffect(() => {
    (async () => {
      const query = new URLSearchParams(search);
      const q = query.get('q');
      if (!q || q.length === 0) {
        history.push('/');
      } else {
        const response = await _search({ q });
        const result = response.data.data;
        setResult(result);
      }
    })();
  }, [history, search]);

  if (!result) return null;

  const { users, posts } = result;

  return (
    <Box width="512px" margin="auto" padding="15px 0">
      {users.length === 0 && posts.length === 0 && (
        <Typography variant="h5" style={{ textAlign: 'center' }}>
          No result found
        </Typography>
      )}
      {users.length !== 0 && (
        <Typography variant="h4" style={{ padding: '10px 0' }}>
          Users
        </Typography>
      )}
      <List disablePadding>
        {users.map((user) => (
          <User user={user} />
        ))}
      </List>
      {posts.length !== 0 && (
        <>
          <Box height="15px"></Box>
          <Typography variant="h4" style={{ padding: '10px 0' }}>
            Posts
          </Typography>
        </>
      )}
      {posts.map((post) =>
        post.type === PostType.POST ? (
          <Post {...post} key={post._id} />
        ) : (
          <Share {...post} key={post._id} />
        )
      )}
    </Box>
  );
};

export default Search;
