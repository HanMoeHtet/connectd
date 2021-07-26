import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import BrandContainer from 'src/components/BrandContainer';
import useProgressButtonStyles from 'src/composables/useProgressButtonStyles';
import Page from 'src/layouts/Page';
import { useAppSelector, useAppDispatch } from 'src/store';
import { resendOTP, verifyPhoneNumber } from 'src/store/verification';

const PhoneNumberVerification: React.FC = () => {
  const classes = useProgressButtonStyles();

  const { isLoading } = useAppSelector((state) => state.authStore);
  const { message } = useAppSelector((state) => state.verificationStore);

  const history = useHistory();
  const dispatch = useAppDispatch();

  const [otp, setOtp] = useState('');

  if (!message) {
    history.replace('/login');
    return null;
  }

  const handleVerifyClick = () => {
    dispatch(verifyPhoneNumber(otp));
  };

  const handleResendClick = () => {
    dispatch(resendOTP());
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
            {message || 'OTP sent to +09123213123'}
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            label="OTP"
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ marginBottom: 30 }}
          />
          <div className={classes.wrapper}>
            <Button
              onClick={handleVerifyClick}
              color="primary"
              variant="contained"
              size="large"
              disabled={isLoading}
              style={{ marginBottom: 30 }}
            >
              Verify
            </Button>
            {isLoading && (
              <CircularProgress className={classes.buttonProgress} size={36} />
            )}
          </div>
          <div className={classes.wrapper}>
            <Button
              onClick={handleResendClick}
              color="primary"
              variant="contained"
              size="large"
              disabled={isLoading}
            >
              Resend
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

export default PhoneNumberVerification;
