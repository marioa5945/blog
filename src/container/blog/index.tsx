import React from 'react';
import H from 'history';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactMd from '@components/react-md/';
import Nav from '@components/nav/';
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

function mapStateToProps(state: { [key: string]: unknown }) {
  return { state };
}

@(connect(mapStateToProps) as any)
export default class PageHome extends React.PureComponent<_router, ifsState> {
  constructor(props: _router) {
    super(props);
    console.log(connect(mapStateToProps));

    this.state = {
      activeId: '',
      directory: [],
      markdown: '',
    };
  }

  async componentDidMount(): Promise<void> {
    try {
      const directory = await axios.get('/api/blog/directory.json');
      this.setState({ directory: directory.data });

      const value = /\/blog\/(.+)/.exec(window.location.href);
      if (value) {
        this.handleNavClick(value[1]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * click nav event
   * @param activeId
   */
  handleNavClick = async (activeId: string): Promise<void> => {
    const { history } = this.props;
    if (activeId !== '') {
      try {
        const contentArr = await axios.get(`/api/blog/${activeId}.json`);
        this.setState({ markdown: contentArr.data.join('\n') });
      } catch (error) {
        console.error(error);
      }
    }

    this.setState({ activeId: activeId });
    history.push(activeId === '' ? '/blog' : `/blog/${activeId}`);
  };

  render(): JSX.Element {
    const { markdown, directory, activeId } = this.state;
    const { history } = this.props;

    return (
      <div className={'blog'}>
        <div className={'background'}></div>
        <Nav
          title={
            <>
              mario <span>a</span>&apos;s blog
            </>
          }
          list={directory}
          handleNavClick={this.handleNavClick}
          handleLogoClick={() => history.push('/')}
          activeId={activeId}
        />
        <main>
          <ReactMd markdown={markdown} />
        </main>
      </div>
    );
  }
}
