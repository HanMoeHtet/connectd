import { Box } from '@material-ui/core';
import React from 'react';

const Page: React.FC = ({ children }) => {
  return (
    <Box width="100vw" maxWidth="100%" minHeight="100vh" position="relative">
      {children}
    </Box>
  );
};

export default Page;
