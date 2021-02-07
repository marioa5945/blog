import { combineEpics } from 'redux-observable';
import { blogEpic } from './blog';

export default combineEpics(blogEpic);
