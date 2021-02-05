import React from 'react';
import H from 'history';
import './style.scss';

interface _router {
  history: H.History<H.LocationState>;
}

interface ifsState {
  activeId: string;
  directory: Array<ifsDirectory>;
  markdown: string;
}

interface ifsDirectory {
  id: string;
  title: string;
  date: string;
  description: string;
}

export default class PageHome extends React.PureComponent<_router, ifsState> {
  constructor(props: _router) {
    super(props);

    this.state = {
      activeId: '',
      directory: [],
      markdown: '',
    };
  }

  render(): React.ReactElement {
    const { history } = this.props;

    return (
      <div className={'home'}>
        <main>
          <h1>
            Mario <span>a</span>
          </h1>
          <p>working hard to write code</p>
          <img src="/img/logo.png" />
          <nav>
            <a onClick={() => history.push('/blog')}>blog</a>
            <a href="https://github.com/marioa5945">github</a>
            <a onClick={() => history.push('/demos')}>demos</a>
            <a href="https://twitter.com/marioa49886908">twitter</a>
            <a onClick={() => history.push('/resume')}>resume</a>
          </nav>
        </main>
      </div>
    );
  }
}
