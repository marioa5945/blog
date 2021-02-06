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
  info: string;
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
  info: { id: '', info: '' },
};

export default (state: ifsReducerState = initData, action: ifsAction): ifsReducerState => {
  switch (action.type) {
    case atBlog.BLOG_DIRECTORY_REDUCER: {
      const directoryList = action.payload.directoryList;
      return { ...state, directoryList };
    }
    default:
      return state;
  }
};
