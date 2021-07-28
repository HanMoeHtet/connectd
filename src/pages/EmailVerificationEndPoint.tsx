import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'src/store';
import { verifyEmail } from 'src/store/verification';

const EmailVerificationEndPoint: React.FC = () => {
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
};

export default EmailVerificationEndPoint;
