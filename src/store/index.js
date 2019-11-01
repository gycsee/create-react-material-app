import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk'
import Immutable from 'immutable';

import reducer from '../reducers';
import api from '../middlewares/api';

const initialState = Immutable.Map();

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const middlewares = [ReduxThunk, api]

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
);

const store = createStore(
  reducer,
  initialState,
  enhancer
);

if (module.hot) {
  // enable Webpack hot module replacement for reducer
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store;