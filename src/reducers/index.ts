import { createStore, combineReducers } from 'redux';
import blog from './blog';
import { deoms } from './deoms';
import { composeWithDevTools } from 'redux-devtools-extension';

// Combine multiple reducers
const rootReducers = combineReducers({ blog, deoms });

const store = process.env.NODE_ENV === 'production' ? createStore(rootReducers) : createStore(rootReducers, composeWithDevTools());

export default store;
