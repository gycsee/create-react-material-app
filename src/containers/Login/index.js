import React from 'react';
import { compose } from "recompose";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import LoginView from "components/LoginView";
import { loginUser, resetError } from './loginState';

function Login({
  isLoading,
  isAuthenticated,
  error,
  loginUser,
  resetError,
}) {
  const [schemaValue, setSchemaValue] = React.useState('');
  const [userValue, setUserValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  function handleInput(e, input = "login") {
    if (error) {
      resetError();
    }
    if (input === "user") {
      setUserValue(e.target.value);
    } else if (input === "password") {
      setPasswordValue(e.target.value);
    } else if (input === "schema") {
      setSchemaValue(e.target.value);
    }
  }

  function handleLoginButtonClick() {
    loginUser(userValue, passwordValue);
  }

  return (
    <LoginView
      isLoading={isLoading}
      isAuthenticated={isAuthenticated}
      error={error}
      schemaValue={schemaValue}
      setSchemaValue={setSchemaValue}
      userValue={userValue}
      setUserValue={setUserValue}
      passwordValue={passwordValue}
      setPasswordValue={setPasswordValue}
      handleInput={handleInput}
      handleLoginButtonClick={handleLoginButtonClick}
    />
  )
}

export default compose(
  connect(
    state => ({
      isLoading: state.getIn(['login', 'isLoading']),
      isAuthenticated: state.getIn(['login', 'isAuthenticated']),
      error: state.getIn(['login', 'error'])
    }),
    { loginUser, resetError }
  ),
  withRouter,
)(Login);