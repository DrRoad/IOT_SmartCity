'use strict';
/**
 * Created by Ben Hu on 2016/3/3.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/smartCity';

export default function configureStore(socketIoMiddleware) {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(socketIoMiddleware, routerMiddleware(browserHistory), createLogger()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
      //DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}