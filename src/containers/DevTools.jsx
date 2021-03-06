'use strict';
/**
 * Created by Ben Hu on 2016/3/4.
 */
import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    changeMonitorKey='ctrl-m'
    defaultPosition='bottom' >
    <LogMonitor />
    <SliderMonitor />
  </DockMonitor>
);