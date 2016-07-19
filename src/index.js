'use strict';
/**
 * Created by Ben Hu on 2016/3/3.
 */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import Root from './containers/Root';
import configureStore from './store/configureStore';

import '../bower_components/font-awesome/css/font-awesome.min.css';
import '../bower_components/semantic/dist/semantic.min.css';
import '../bower_components/semantic/dist/semantic.min.js';
import '../assets/css/app.css';

const socket = io('http://localhost:8080');
const socketIoMiddleware = createSocketIoMiddleware(socket, "SOCKET_");

const store = configureStore(socketIoMiddleware);
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Root store={store} history={history}/>,
    document.getElementById('root')
);
