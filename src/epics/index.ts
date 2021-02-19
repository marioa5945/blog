import { combineEpics } from 'redux-observable';
import blog from './blog';

export default combineEpics(...blog);
