import { createStore, combineReducers, applyMiddleware } from 'redux';
import blog from './blog';
import { deoms } from './deoms';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '@src/epics';

const epicMiddleware = createEpicMiddleware();

// Combine multiple reducers
const rootReducers = combineReducers({ blog, deoms });

const store =
  process.env.NODE_ENV === 'production'
    ? createStore(rootReducers, applyMiddleware(epicMiddleware))
    : createStore(rootReducers, composeWithDevTools(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);

export default store;
