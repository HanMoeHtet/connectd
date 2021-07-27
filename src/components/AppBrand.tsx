import React from 'react';
import { Link } from 'react-router-dom';
import Brand from './icons/Brand';

interface Props {
  linkTo?: string;
}

const AppBrand: React.FC<Props> = ({ linkTo = '/' }) => {
  return (
    <Link to={linkTo}>
      <Brand fill="#9c27b0" width="200px" />
    </Link>
  );
};

export default AppBrand;
