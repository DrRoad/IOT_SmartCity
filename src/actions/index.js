'use strict';
/**
 * Created by Ben Hu on 2016/3/3.
 */
import * as actionTypes from '../constants/actionTypes';

export function socketScanDevice() {
    return {
        type: actionTypes.SOCKET_SCAN_DEVICE
    }
}

export function socketStopScanDevice() {
    return {
        type: actionTypes.SOCKET_STOP_SCAN_DEVICE
    }
}

export function socketConnectDevice(address) {
    return {
        type: actionTypes.SOCKET_CONNECT_DEVICE,
        address: address
    }
}

export function socketOpenLight() {
    return {
        type: actionTypes.SOCKET_OPEN_LIGHT
    }
}

export function socketOffLight() {
    return {
        type: actionTypes.SOCKET_OFF_LIGHT
    }
}

export function resetErrorMessage() {
    return {
        type: actionTypes.RESET_ERROR_MESSAGE
    }
}


