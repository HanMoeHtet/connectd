import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './icons/Logo';

const AppLogo: React.FC = () => {
  return (
    <Link to="/">
      <Logo fill="9c27b0" width="200px" />
    </Link>
  );
};

export default AppLogo;
