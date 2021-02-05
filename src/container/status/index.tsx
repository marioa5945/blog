import React from 'react';
import './style.scss';

const Page404: React.FC = () => {
  return (
    <div className={'status'}>
      <h1>404</h1>
      <h3>File not found</h3>
      <a href={'/'}>black</a>
    </div>
  );
};

export default Page404;
