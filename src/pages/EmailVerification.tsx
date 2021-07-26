import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import BrandContainer from 'src/components/BrandContainer';
import useProgressButtonStyles from 'src/composables/useProgressButtonStyles';
import Page from 'src/layouts/Page';
import { useAppDispatch, useAppSelector } from 'src/store';
import { resendEmail } from 'src/store/verification';

const EmailVerification: React.FC = () => {
  const classes = useProgressButtonStyles();

  const { isLoading } = useAppSelector((state) => state.authStore);
  const { message } = useAppSelector((state) => state.verificationStore);
  const history = useHistory();
  const dispatch = useAppDispatch();

  if (!message) {
    history.replace('/login');
    return null;
  }

  const handleClick = () => {
    dispatch(resendEmail());
  };

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
          padding="20px"
          borderRadius="8px"
        >
          <Typography variant="h6" align="center" style={{ marginBottom: 40 }}>
            Check your inbox
          </Typography>
          <Typography align="center" style={{ marginBottom: 30 }}>
            {message}
          </Typography>
          <div className={classes.wrapper}>
            <Button
              onClick={handleClick}
              variant="contained"
              size="large"
              color="primary"
              disabled={isLoading}
            >
              RESEND
            </Button>
            {isLoading && (
              <CircularProgress className={classes.buttonProgress} size={36} />
            )}
          </div>
        </Box>
      </Box>
    </Page>
  );
};

export default EmailVerification;
