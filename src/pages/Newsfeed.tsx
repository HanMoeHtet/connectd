import React from 'react';
import PostsSection from 'src/components/PostsSection';
import Main from 'src/layouts/Main';

const Newsfeed: React.FC = () => {
  return (
    <Main>
      <PostsSection />
    </Main>
  );
};

export default Newsfeed;
