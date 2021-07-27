import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './icons/Logo';

interface Props {
  linkTo?: string;
}

const AppLogo: React.FC<Props> = ({ linkTo = '/' }) => {
  return (
    <Link to={linkTo}>
      <Logo fill="#9c27b0" width="46px" />
    </Link>
  );
};

export default AppLogo;
