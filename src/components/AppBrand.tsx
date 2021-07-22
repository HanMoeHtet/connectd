import React from 'react';
import { Link } from 'react-router-dom';
import Brand from './icons/Brand';

const AppBrand: React.FC = () => {
  return (
    <Link to="/">
      <Brand fill="#9c27b0" width="200px" />
    </Link>
  );
};

export default AppBrand;
