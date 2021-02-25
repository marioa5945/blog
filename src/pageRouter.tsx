import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import store from './reducers/';
import BlogPage from './container/blog/';

const history = createHashHistory();

const PageRouter: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path={'/'} exact={true} component={BlogPage} />
        <Route path={'/blog'} component={BlogPage} />
      </Router>
    </Provider>
  );
};

export default PageRouter;
