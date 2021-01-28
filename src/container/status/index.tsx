import * as React from 'react';
import './status.scss';

const Page404: React.FunctionComponent = () => {
  return <div className={'status'}>
    <h1>404</h1>
    <h3>File not found</h3>
    <a href={'/'}>black</a>
  </div>;
};

export default Page404;
