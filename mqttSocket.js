'use strict';
/**
 * Created by Ben Hu on 2016/3/6.
 */
module.exports = function (io) {
  const mqtt = require('mqtt');
  const mqttClient = mqtt.connect('mqtts://140.119.19.100:8883', {
    certPath: './key/oring-cert.pem',
    rejectUnauthorized: false,
    username: 'test',
    password: 'test',
    clientId: 'cms',
  });
  const actionTypes = require('./src/constants/smartCityActionTypes');

  mqttClient.subscribe('/SYSTEM/GATEWAY/RES/#');
  mqttClient.subscribe('/GATEWAY/RES/#');

  mqttClient.on('message', function (topic, message) {
    try {
      let payload = JSON.parse(message.toString());
      switch (payload.reportType) {
        case 'listGateway':
          io.emit('action', { type: actionTypes.SOCKET_SCAN_GATEWAY_SUCCESS, payload });
          break;
        case 'scan':
          io.emit('action', {
            type: actionTypes.SOCKET_SCAN_DEVICE_SUCCESS, payload: {
              gatewayId: payload.gatewayId,
              result: payload.result,
            }
          });
          break;
        case 'connect':
          console.log(payload);
          if (payload.result.success) {
            io.emit('action', {
              type: actionTypes.SOCKET_CONNECT_DEVICE_SUCCESS, payload: {
                gatewayId: payload.gatewayId,
                address: payload.result.address,
                name: payload.result.name,
              }
            });
          } else {
            io.emit('action', {
              type: actionTypes.SOCKET_CONNECT_DEVICE_FAILED, payload: {
                gatewayId: payload.gatewayId,
                address: payload.result.address,
                name: payload.result.name,
              }
            });
          }
          break;
        case 'controlledDevices':
          io.emit('action', {
            type: actionTypes.SOCKET_CONTROLLED_DEVICES_SUCCESS, payload: {
              gatewayId: payload.gatewayId,
              result: payload.result,
            }
          });
          break;
        case 'disconnect':
          io.emit('action', {
            type: actionTypes.SOCKET_DISCONNECT_DEVICE_SUCCESS, payload: {
              gatewayId: payload.gatewayId,
              address: payload.result.address,
              name: payload.result.name,
            }
          });
          break;
        default:
          return;
      }

    } catch (e) {
      console.error(e);
    }
  });

  return mqttClient;
};
