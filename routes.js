'use strict';
/**
 * Created by Ben Hu on 2016/3/4.
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './src/containers/App';
import Main from './src/containers/Main';
import DashBoard from './src/containers/DashBoard';
import BluetoothDashBoard from './src/containers/BluetoothDashBoard';
import LightControlDashBoard from './src/containers/LightControlDashBoard';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={Main} />
    <Route path="/dashboard" component={DashBoard} >
      <Route path="bluetooth" component={BluetoothDashBoard} />
      <Route path="lightcontrol" component={LightControlDashBoard} />
    </Route>
  </Route>
)
