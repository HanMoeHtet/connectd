import { Box, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import AppBrand from 'src/components/AppBrand';
import LoginForm from 'src/components/LoginForm';
import RegisterForm from 'src/components/RegisterForm';
import Page from 'src/layouts/Page';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: '50%',
    },

    [theme.breakpoints.up('lg')]: {
      width: '33%',
    },
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  return (
    <Page>
      <Box position="absolute" top="0" margin="10px">
        <AppBrand />
      </Box>
      <Box
        width="100%"
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="20px"
      >
        <Box
          bgcolor="background.paper"
          display="flex"
          alignItems="center"
          flexDirection="column"
          className={classes.formContainer}
          padding="20px"
          borderRadius="8px"
        >
          {isLoggingIn ? (
            <LoginForm setIsLogginIn={setIsLoggingIn} />
          ) : (
            <RegisterForm setIsLogginIn={setIsLoggingIn} />
          )}
        </Box>
      </Box>
    </Page>
  );
};

export default Login;
