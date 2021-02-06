import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import store from './reducers/';

const history = createHashHistory();

const PageHome = React.lazy(() => import('./container/home/'));
const PageBlog = React.lazy(() => import('./container/blog/'));
const PageDemos = React.lazy(() => import('./container/demos/'));
const Page404 = React.lazy(() => import('./container/status/'));
import Loading from '@components/loading/';

const PageRouter: React.FC = () => {
  return (
    <Suspense fallback={<Loading logoUrl={'/img/logo.png'} />}>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact={true} path={'/'} component={PageHome} />
            <Route path={'/blog'} component={PageBlog} />
            <Route path={'/demos'} component={PageDemos} />
            <Route component={Page404} />
          </Switch>
        </Router>
      </Provider>
    </Suspense>
  );
};

export default PageRouter;
