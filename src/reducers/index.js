import { combineReducers } from 'redux-immutable';

import login from 'containers/Login/loginState';
import common from 'containers/commonState';

export default combineReducers({
  login,
  common,
});