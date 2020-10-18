import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from './components/App/App';
import { store } from './store/store';

import './index.css';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root'),
);
