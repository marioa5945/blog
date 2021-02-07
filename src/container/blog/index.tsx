import React from 'react';
import { connect } from 'react-redux';
import ReactMd from '@components/react-md/';
import Nav from '@components/nav/';
import './style.scss';
import { atBlog } from '@src/actionType';

/**
 * ifsState
 * @property activeId: string
 */
interface ifsState {
  activeId: string;
  markdown: string;
}

@(connect((state: { [key: string]: unknown }) => {
  return { blog: state.blog };
}) as any)
export default class PageBlog extends React.PureComponent<ifsPage, ifsState> {
  constructor(props: ifsPage) {
    super(props);

    this.state = {
      activeId: '',
      markdown: '',
    };
  }

  async componentDidMount(): Promise<void> {
    const { dispatch } = this.props;

    try {
      dispatch({
        type: atBlog.BLOG_DIRECTORY_EPIC,
      });

      // const value = /\/blog\/(.+)/.exec(window.location.href);
      // if (value) {
      //   this.handleNavClick(value[1]);
      // }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * click nav event
   * @param activeId string
   */
  handleNavClick = async (activeId: string): Promise<void> => {
    const { history } = this.props;
    if (activeId !== '') {
      // try {
      //   const contentArr = await axios.get(`/api/blog/${activeId}.json`);
      //   this.setState({ markdown: contentArr.data.join('\n') });
      // } catch (error) {
      //   console.error(error);
      // }
    }

    this.setState({ activeId: activeId });
    history.push(activeId === '' ? '/blog' : `/blog/${activeId}`);
  };

  render(): JSX.Element {
    const { markdown, activeId } = this.state;
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
          list={_.get(this.props, 'blog.directoryList') ?? []}
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
