'use strict';
/**
 * Created by Ben Hu on 2016/3/3.
 */
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as actionTypes  from '../constants/actionTypes';

const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === actionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error.message || 'Something bad happend.';
  }

  return state;
};

const newDeviceFound = (state, action) => {
  switch (action.type) {
    case actionTypes.SOCKET_SCAN_DEVICE_SUCCESS:
      let isExist = false;
      state.forEach(device => {
        if (device.address === action.response.address) {
          isExist = true;
        }
      });
      if (isExist) {
        return state;
      } else {
        return state.concat(action.response);
      }
  }
};

const connectDeviceSuccess = (state, action) => {
  switch (action.type) {
    case actionTypes.SOCKET_CONNECT_DEVICE_SUCCESS:
      return state.map(device => {
        if (device.address === action.response.address) {
          return Object.assign({}, device, {
            connected: true
          });
        } else {
          return state;
        }
      })
  }
};

const deviceControl = (state = {
  isScanning: false,
  isConnecting: false,
  devices: []
}, action) => {
  switch (action.type) {
    case actionTypes.SOCKET_SCAN_DEVICE:
      return Object.assign({}, state, {
        isScanning: true
      });
    case actionTypes.SOCKET_SCAN_DEVICE_SUCCESS:
      return Object.assign({}, state, {
        devices: newDeviceFound(state.devices, action)
      });
    case actionTypes.SOCKET_SCAN_DEVICE_FAILURE:
      return Object.assign({}, state, {
        isScanning: false
      });
    case actionTypes.SOCKET_STOP_SCAN_DEVICE:
      return Object.assign({}, state, {
        isScanning: false
      });
    case actionTypes.SOCKET_CONNECT_DEVICE:
      return Object.assign({}, state, {
        isConnecting: true
      });
    case actionTypes.SOCKET_CONNECT_DEVICE_SUCCESS:
      return Object.assign({}, state, {
        isConnecting: false,
        devices: connectDeviceSuccess(state.devices, action)
      });
    case actionTypes.SOCKET_CONNECT_DEVICE_FAILURE:
      return Object.assign({}, state, {
        isConnecting: false
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  deviceControl,
  errorMessage,
  routing
});

export default rootReducer;