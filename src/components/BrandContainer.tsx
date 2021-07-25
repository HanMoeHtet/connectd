import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import AppBrand from './AppBrand';

const useStyles = makeStyles((theme) => ({
  brandContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));

const BrandContainer: React.FC = () => {
  const classes = useStyles();
  return (
    <Box
      position="absolute"
      top="0"
      padding="10px"
      className={classes.brandContainer}
    >
      <AppBrand />
    </Box>
  );
};

export default BrandContainer;
