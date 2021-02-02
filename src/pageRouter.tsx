import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from './reducers';

const history = createHashHistory();

import PageHome from './container/home/';
import Blog from './container/blog/';
import Page404 from './container/status/';

const PageRouter: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact={true} path={'/'} component={PageHome} />
          <Route path={'/blog'} component={Blog} />
          <Route component={Page404} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default PageRouter;
