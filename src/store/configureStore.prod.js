'use strict';
/**
 * Created by Ben Hu on 2016/3/3.
 */
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/smartCity';


export default function configureStore(socketIoMiddleware) {
  const store = createStore(
    rootReducer,
    applyMiddleware(socketIoMiddleware)
  );

  return store;
}