import * as React from 'react';
import { render } from 'react-dom';
import Router from './pageRouter';

render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);