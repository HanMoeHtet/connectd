import { Box, CircularProgress, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import BrandContainer from 'src/components/BrandContainer';
import Page from 'src/layouts/Page';
import { useAppDispatch, useAppSelector } from 'src/store';
import { verifyEmail } from 'src/store/verification';

const EmailVerificationEndPoint: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.verificationStore);

  const dispatch = useAppDispatch();
  const history = useHistory();
  const { search } = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(search);
    const token = query.get('token');

    if (token) {
      dispatch(verifyEmail(token));
    } else {
      history.replace('/login');
    }
  }, [dispatch, search, history]);

  return null;

  // return (
  //   <Page>
  //     <BrandContainer />
  //     <Box
  //       width="100%"
  //       minHeight="100vh"
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       padding="20px"
  //     >
  //       {isLoading && (
  //         <Box
  //           bgcolor="background.paper"
  //           display="flex"
  //           alignItems="center"
  //           flexDirection="column"
  //           padding="20px"
  //           borderRadius="8px"
  //         >
  //           <Typography
  //             variant="h6"
  //             align="center"
  //             style={{ marginBottom: 40 }}
  //           >
  //             Verifying email
  //           </Typography>
  //           <CircularProgress size={36} />
  //         </Box>
  //       )}
  //     </Box>
  //   </Page>
  // );
};

export default EmailVerificationEndPoint;
