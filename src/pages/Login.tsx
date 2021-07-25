import { Box, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import BrandContainer from 'src/components/BrandContainer';
import LoginForm from 'src/components/LoginForm';
import RegisterForm from 'src/components/RegisterForm';
import Page from 'src/layouts/Page';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: '50px',
    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: '50%',
    },

    [theme.breakpoints.up('lg')]: {
      width: '35%',
    },
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  return (
    <Page>
      <BrandContainer />
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
