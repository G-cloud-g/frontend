import { createStore, applyMiddleware, compose } from 'redux';

import thunkMiddleware from 'redux-thunk';

import reducers from './reducer';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunkMiddleware),
    global.window?.__REDUX_DEVTOOLS_EXTENSION__
      ? global.window?.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
