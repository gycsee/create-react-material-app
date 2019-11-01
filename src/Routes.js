import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from 'containers/Login';
import Layout from 'containers/Layout';
import NotFound from 'containers/NotFound';

const PrivateRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest} render={props => (
      localStorage.getItem('_token') ? (
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    )}
    />
  );
};

const PublicRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest} render={props => (
      localStorage.getItem('_token') ? (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      ) : (
        React.createElement(component, props)
      )
    )}
    />
  );
};

const Routes = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
    <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} />
    <PrivateRoute path="/app" component={Layout} />
    <PublicRoute path="/login" component={Login} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
);

export default Routes;