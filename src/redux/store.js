// @flow
import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedEnhancer = composeEnhancers(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, composedEnhancer);

export default store;
