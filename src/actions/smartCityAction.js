/**
 * Created by Ben Hu on 2016/6/27.
 */
import * as smartCityActions  from '../constants/smartCityActionTypes';

export function socketScanGateway() {
  return {
    type: smartCityActions.SOCKET_SCAN_GATEWAY,
  }
}

export function socketScanDevice(gatewayId) {
  return {
    type: smartCityActions.SOCKET_SCAN_DEVICE,
    gatewayId,
  }
}

export function socketConnectDevice(gatewayId, address, name) {
  return {
    type: smartCityActions.SOCKET_CONNECT_DEVICE,
    gatewayId,
    address,
    name,
  }
}

export function socketBrightness(gatewayId, address, name, b) {
  return {
    type: smartCityActions.SOCKET_BRIGHTNESS,
    gatewayId,
    address,
    name,
    b,
  }
}

export function listControlledDevices(gatewayId) {
  return {
    type: smartCityActions.SOCKET_CONTROLLED_DEVICES,
    gatewayId,
  }
}

export function socketDisconnectDevice(gatewayId, address, name) {
  return {
    type: smartCityActions.SOCKET_DISCONNECT_DEVICE,
    gatewayId,
    address,
    name,
  }
}