import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import {connectedRouterRedirect} from "redux-auth-wrapper/history4/redirect";
import {isEmpty} from 'lodash';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'

const locationHelper = locationHelperBuilder({});

const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => !isEmpty(state.user.data),
  wrapperDisplayName: 'UserIsAuthenticated'
});

const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
  authenticatedSelector: state => isEmpty(state.user.data),
  wrapperDisplayName: 'UserIsNotAuthenticated'
})


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={userIsAuthenticated(Home)} />
          <Route path="/register" component={userIsNotAuthenticated(Register)} />
          <Route path="/login" component={userIsNotAuthenticated(Login)} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
