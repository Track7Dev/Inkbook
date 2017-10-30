import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import Reducers from './reducers';
import App from './components/app';
import './index.css';

const create_MW_Store = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={create_MW_Store(Reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <App />
  </Provider>
, document.getElementById('root'));
