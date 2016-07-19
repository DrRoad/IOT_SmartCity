'use strict';
/**
 * Created by Ben Hu on 2016/3/5.
 */
module.exports = function (server) {
  const io = require('socket.io')(server);
  const actionTypes = require('./src/constants/smartCityActionTypes');
  const mqttTopic = 'lightControl';
  const mqttClient = require('./mqttSocket')(io);

  io.on('connection', function (socket) {
    let socketId = socket.id;

    socket.on('action', (action) => {
      switch (action.type) {
        case actionTypes.SOCKET_SCAN_GATEWAY:
          mqttPublish('/SYSTEM/GATEWAY/REQ/LIST', {});
          break;
        case actionTypes.SOCKET_SCAN_DEVICE:
          mqttPublish(`/GATEWAY/REQ/${action.gatewayId}`, {
            cmd: { type: 'scan' },
          });
          break;
        case actionTypes.SOCKET_CONNECT_DEVICE:
          mqttPublish(`/GATEWAY/REQ/${action.gatewayId}`, {
            cmd: {
              type: 'connect',
              target: [{
                address: action.address,
                name: action.name,
              }]
            },
          });
          break;
        case actionTypes.SOCKET_BRIGHTNESS:
          mqttPublish(`/GATEWAY/REQ/${action.gatewayId}`, {
            cmd: {
              type: 'brightness',
              target: [{
                address: action.address,
                name: action.name,
              }],
              args: { b: action.b }
            },
          });
          break;
        case actionTypes.SOCKET_CONTROLLED_DEVICES:
          mqttPublish(`/GATEWAY/REQ/${action.gatewayId}`, {
            cmd: { type: 'controlledDevices' },
          });
          break;
        case actionTypes.SOCKET_DISCONNECT_DEVICE:
          mqttPublish(`/GATEWAY/REQ/${action.gatewayId}`, {
            cmd: {
              type: 'disConnect',
              target: [{
                address: action.address,
                name: action.name,
              }]
            },
          });
          break;
        default:
          break;
      }
    });

    socket.on('disconnect', () => {
      mqttPublish(mqttTopic, {
        type: actionTypes.SOCKET_KILL_BLE_DRIVER,
        socketId: socketId
      });
    });

    function mqttPublish(topic, payload) {
      mqttClient.publish(topic, JSON.stringify(payload));
    }
  });
};
