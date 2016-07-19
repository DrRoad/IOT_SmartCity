/**
 * Created by Ben Hu on 2016/6/27.
 */
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as smartCityActions  from '../constants/smartCityActionTypes';

const newGatewayFound = (state, action) => {
  switch (action.type) {
    case smartCityActions.SOCKET_SCAN_GATEWAY_SUCCESS:
      let isExist = false;
      state.forEach((gateway => {
        if (gateway.id === action.payload.info.id) {
          isExist = true;
        }
      }));
      if (isExist) {
        return state;
      }
      return state.concat(
        Object.assign({}, action.payload.info, {
          scanDevices: [],
          controlledDevices: [],
          scanningDevice: false,
        })
      );
    case smartCityActions.SOCKET_SCAN_DEVICE:
      return state.map((gateway) => {
        if (action.gatewayId === gateway.id) {
          return Object.assign({}, gateway, {
            scanningDevice: true,
          });
        }
        return gateway;
      });
    case smartCityActions.SOCKET_SCAN_DEVICE_SUCCESS:
      return state.map((gateway) => {
        if (action.payload.gatewayId === gateway.id) {
          return Object.assign({}, gateway, {
            scanDevices: action.payload.result.devices,
            scanningDevice: false,
          });
        }
        return gateway;
      });
    case smartCityActions.SOCKET_CONNECT_DEVICE:
      return state.map((gateway) => {
        if (action.gatewayId === gateway.id) {
          return Object.assign({}, gateway, {
            scanDevices: gateway.scanDevices.map((device) => {
              if (device.module.address === action.address) {
                return Object.assign({}, device, {
                  isConnecting: true,
                });
              }
              return device;
            }),
          });
        }
        return gateway;
      });
    case smartCityActions.SOCKET_CONNECT_DEVICE_SUCCESS:
      return state.map((gateway) => {
        if (action.payload.gatewayId === gateway.id) {
          return Object.assign({}, gateway, {
            scanDevices: gateway.scanDevices.filter((g) => g.module.address !== action.payload.address),
            controlledDevices: gateway.controlledDevices.concat({
              address: action.payload.address,
              name: action.payload.name,
            })
          });
        }
        return gateway;
      });
    case smartCityActions.SOCKET_CONTROLLED_DEVICES_SUCCESS:
      return state.map((gateway) => {
        if (action.payload.gatewayId === gateway.id) {
          return Object.assign({}, gateway, {
            controlledDevices: action.payload.result.devices,
          });
        }
        return gateway;
      });
    case smartCityActions.SOCKET_DISCONNECT_DEVICE_SUCCESS:
      return state.map((gateway) => {
        if (action.payload.gatewayId === gateway.id) {
          return Object.assign({}, gateway, {
            controlledDevices: gateway.controlledDevices.filter((g) => g.address !== action.payload.address),
          });
        }
        return gateway;
      });
    default:
      return state;
  }
};

const smartCity = (state = {
  gatewayList: [],
  scanningGateway: false,
}, action) => {
  console.log(action);
  switch (action.type) {
    case smartCityActions.SOCKET_SCAN_GATEWAY:
      return Object.assign({}, state, {
        scanningGateway: true,
      });
    case smartCityActions.SOCKET_SCAN_GATEWAY_SUCCESS:
      return Object.assign({}, state, {
        scanningGateway: false,
        gatewayList: newGatewayFound(state.gatewayList, action),
      });
    case smartCityActions.SOCKET_SCAN_DEVICE:
      return Object.assign({}, state, {
        gatewayList: newGatewayFound(state.gatewayList, action),
      });
    case smartCityActions.SOCKET_SCAN_DEVICE_SUCCESS:
      return Object.assign({}, state, {
        gatewayList: newGatewayFound(state.gatewayList, action),
      });
    case smartCityActions.SOCKET_CONNECT_DEVICE:
      return Object.assign({}, state, {
        gatewayList: newGatewayFound(state.gatewayList, action),
      });
    case smartCityActions.SOCKET_CONNECT_DEVICE_SUCCESS:
      return Object.assign({}, state, {
        gatewayList: newGatewayFound(state.gatewayList, action),
      });
    case smartCityActions.SOCKET_CONTROLLED_DEVICES_SUCCESS:
      return Object.assign({}, state, {
        gatewayList: newGatewayFound(state.gatewayList, action),
      });
    case smartCityActions.SOCKET_DISCONNECT_DEVICE_SUCCESS:
      return Object.assign({}, state, {
        gatewayList: newGatewayFound(state.gatewayList, action),
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  smartCity,
  routing
});

export default rootReducer;