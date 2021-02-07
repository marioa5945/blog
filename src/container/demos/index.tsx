import React from 'react';
import H from 'history';
import { connect } from 'react-redux';
import Nav from '@components/nav/';
import './style.scss';

interface _router {
  history: H.History<H.LocationState>;
}

interface ifsState {
  activeId: string;
  directory: Array<ifsDirectory>;
}

interface ifsDirectory {
  id: string;
  title: string;
  date: string;
  description: string;
}

function mapStateToProps(state: { [key: string]: unknown }) {
  return { demos: state.demos };
}

@(connect(mapStateToProps) as any)
export default class PageDemos extends React.PureComponent<_router, ifsState> {
  constructor(props: _router) {
    super(props);

    this.state = {
      activeId: '',
      directory: [],
    };
  }

  async componentDidMount(): Promise<void> {
    //
  }

  /**
   * click nav event
   * @param activeId string
   */
  handleNavClick = async (activeId: string): Promise<void> => {
    const { history } = this.props;
    if (activeId !== '') {
      //
    }

    this.setState({ activeId: activeId });
    history.push(activeId === '' ? '/demos' : `/demos/${activeId}`);
  };

  render(): JSX.Element {
    const { directory, activeId } = this.state;
    const { history } = this.props;

    return (
      <div className={'blog'}>
        <div className={'background'}></div>
        <Nav
          title={
            <>
              mario <span>a</span>&apos;s demos
            </>
          }
          list={directory}
          handleNavClick={this.handleNavClick}
          handleLogoClick={() => history.push('/')}
          activeId={activeId}
        />
        <main></main>
      </div>
    );
  }
}
