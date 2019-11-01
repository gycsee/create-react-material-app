import { fromJS } from 'immutable';

export const initialState = fromJS({
  isLoading: false,
  isAuthenticated: !!localStorage.getItem("_token"),
  error: null
});

export const START_LOGIN = "Login/START_LOGIN";
export const LOGIN_SUCCESS = "Login/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "Login/LOGIN_FAILURE";
export const RESET_ERROR = "Login/RESET_ERROR";
export const LOGIN_USER = "Login/LOGIN_USER";
export const SIGN_OUT_SUCCESS = "Login/SIGN_OUT_SUCCESS";

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const resetError = () => ({
  type: RESET_ERROR
});

export const loginUser = (user, password) => dispatch => {
  dispatch({ type: START_LOGIN });
  if (user === 'admin' && password === '888888') {
    setTimeout(() => {
      localStorage.setItem('_token', 'user.login.auth_token');
      dispatch(loginSuccess());
    }, 2000);
  } else {
    dispatch({ type: LOGIN_FAILURE });
  }
};

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS
});

export const signOut = () => dispatch => {
  localStorage.removeItem("_token");
  window.location.href = '/';
  // dispatch(signOutSuccess());
};

export default function loginReducer(state = initialState, { type, payload }) {
  switch (type) {
    case START_LOGIN:
      return state.set('isLoading', true);
    case LOGIN_SUCCESS:
      return state.merge({
        isLoading: false,
        isAuthenticated: true,
        error: null
      });
    case LOGIN_FAILURE:
      return state.merge({
        isLoading: false,
        error: true
      });
    case RESET_ERROR:
      return state.set('error', false);
    case SIGN_OUT_SUCCESS:
      return state.set('isAuthenticated', false);
    default:
      return state;
  }
}