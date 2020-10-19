import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { auth } from './Auth/Auth.reducer';
import { snackbar } from './Snackbar/Snackbar.reducer';

export const rootReducer = combineReducers({
  auth,
  snackbar,
});

const logger = createLogger({
  collapsed: true,
});

export const store = createStore(rootReducer, applyMiddleware(logger, thunk));
