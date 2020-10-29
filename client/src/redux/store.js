import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer.js';

const preloadedState = window.localStorage.getItem('state') || '{"employee": []}';

export default createStore(
  combineReducers({
    employee: reducer,
  }),
  JSON.parse(preloadedState),
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware,
    ),
  ),
);
