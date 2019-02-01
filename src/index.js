import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import {LOGIN_SUCCESS} from "./actions/action_user";
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ?
  composeWithDevTools(applyMiddleware(thunk)) :
  applyMiddleware(thunk);

const store = createStore(rootReducer, middlewares );

const user = localStorage.getItem('user');

if(user) {
  store.dispatch({ type: LOGIN_SUCCESS, payload: JSON.parse(user) });
}

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
