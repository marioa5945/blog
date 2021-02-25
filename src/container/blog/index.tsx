import React from 'react';
import { connect } from 'react-redux';
import ReactMd from '@marioa/react-md';
import Nav from './nav';
import './style.scss';
import { atBlog } from '@src/actionType';

/**
 * ifsState
 * @property activeId: string
 */
interface ifsState {
  activeId: string;
}

@(connect((state: { [key: string]: unknown }) => {
  return { blog: state.blog };
}) as any)
export default class PageBlog extends React.PureComponent<ifsPage, ifsState> {
  constructor(props: ifsPage) {
    super(props);

    this.state = {
      activeId: '',
    };
  }

  componentDidMount(): void {
    const { dispatch } = this.props;

    dispatch({
      type: atBlog.BLOG_DIRECTORY_EPIC,
    });

    const value = /\/blog\/(.+)/.exec(window.location.href);
    if (value) {
      this.handleNavClick(value[1]);
    }
  }

  /**
   * click nav event
   * @param activeId string
   */
  handleNavClick = async (activeId: string): Promise<void> => {
    const { history, dispatch } = this.props;
    if (activeId !== '') {
      dispatch({
        type: atBlog.BLOG_INFO_EPIC,
        payload: {
          id: activeId,
        },
      });
    }

    this.setState({ activeId: activeId });
    history.push(activeId === '' ? '/blog' : `/blog/${activeId}`);
  };

  render(): JSX.Element {
    const { activeId } = this.state;
    const { history, blog } = this.props;

    return (
      <div className={'blog'}>
        <div className={'background'}></div>
        <Nav
          title={
            <>
              mario <span>a</span>&apos;s blog
            </>
          }
          list={_.get(blog, 'directoryList') ?? []}
          handleNavClick={this.handleNavClick}
          handleLogoClick={() => history.push('/')}
          activeId={activeId}
        />
        <main>
          <ReactMd markdown={_.get(blog, 'info.content')} />
        </main>
      </div>
    );
  }
}
