import { atBlog } from '../actionType';

interface ifsAction {
  type: string;
  payload: ifsReducerState;
}

interface ifsDirectory {
  id: string;
  title: string;
  date: string;
  description: string;
}

interface ifsInfo {
  id: string;
  content: string;
}

interface ifsReducerState {
  directoryList: Array<ifsDirectory>;
  infoList: Array<ifsInfo>;
  idList: Array<string>;
  info: ifsInfo;
}

const initData: ifsReducerState = {
  directoryList: [],
  infoList: [],
  idList: [],
  info: { id: '', content: '' },
};

export default (state: ifsReducerState = initData, action: ifsAction): ifsReducerState => {
  switch (action.type) {
    case atBlog.BLOG_DIRECTORY_REDUCER: {
      const { directoryList } = action.payload;
      return { ...state, directoryList };
    }
    case atBlog.BLOG_INFO_REDUCER: {
      const { info } = action.payload;
      return { ...state, info };
    }
    default:
      return state;
  }
};
