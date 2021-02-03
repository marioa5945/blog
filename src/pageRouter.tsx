import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from './reducers';

const history = createHashHistory();

const PageHome = React.lazy(() => import('./container/home/'));
const Blog = React.lazy(() => import('./container/blog/'));
const Page404 = React.lazy(() => import('./container/status/'));

const PageRouter: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact={true} path={'/'} component={PageHome} />
            <Route path={'/blog'} component={Blog} />
            <Route component={Page404} />
          </Switch>
        </Router>
      </Provider>
    </Suspense>
  );
};

export default PageRouter;
