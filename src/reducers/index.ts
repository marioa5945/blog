import { createStore, combineReducers } from 'redux';
import { blog } from './blog';
import { deoms } from './deoms';
import { composeWithDevTools } from 'redux-devtools-extension';

// Combine multiple reducers
const rootReducers = combineReducers({ blog, deoms });

export const store = createStore(rootReducers, composeWithDevTools());
