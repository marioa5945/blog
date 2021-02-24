import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import store from './reducers/';

const history = createHashHistory();

const loadComponent = (scope: string, module: string, url: string) => async (): Promise<{
  default: React.ComponentType<unknown>;
}> => {
  await useDynamicScript(url);
  // @ts-ignore
  await __webpack_init_sharing__('default');
  // @ts-ignore
  const container = window[scope];
  // @ts-ignore
  await container.init(__webpack_share_scopes__.default);
  // @ts-ignore
  const factory = await window[scope].get(module);
  return factory();
};

const useDynamicScript = (url: string) => {
  const element = document.createElement('script');
  element.src = url;
  element.type = 'text/javascript';
  element.async = true;
  document.head.appendChild(element);

  return new Promise((resolve) => {
    element.onload = () => {
      resolve(true);
    };
    element.onerror = () => {
      //
    };
  });
};

const PageHome = React.lazy(() => import('./container/home/'));
const PageBlog = React.lazy(() => import('./container/blog/'));
const Page404 = React.lazy(() => import('./container/status/'));
const PageDemos = React.lazy(loadComponent('app2', './Widget', `${remoteServer}/react-components/remoteEntry.js`));
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
