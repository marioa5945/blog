import * as React from 'react';
import { Router, Route, Switch, } from 'react-router-dom';
import { createHashHistory } from 'history';
const history = createHashHistory();

import PageHome from './container/home/';
import Blog from './container/blog/';
import Page404 from './container/status/';

export default class PageRouter extends React.Component {
  constructor(props: {[key: string]: string}){
    super(props);
  }

  render(): React.ReactElement {
    return (
      <div className="app" >
        <Router history={history}>
          <Switch>
            <Route
              exact={true}
              path={'/'}
              component={PageHome}
            />
            <Route
              path={'/blog'}
              component={Blog}
            />
            <Route component={Page404} />
          </Switch>
        </Router>
      </div>
    );
  }
}
