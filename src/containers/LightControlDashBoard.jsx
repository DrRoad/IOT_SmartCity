'use strict';
/**
 * Created by Ben Hu on 2016/6/27.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  socketScanGateway,
  socketScanDevice,
  socketConnectDevice,
  socketBrightness,
  listControlledDevices,
  socketDisconnectDevice,
} from '../actions/smartCityAction';

class LightControlDashBoard extends Component {
  constructor(props) {
    super(props);
    this.listGateway = this.listGateway.bind(this);
    this.handleScanDevice = this.handleScanDevice.bind(this);
    this.handleConnectDevice = this.handleConnectDevice.bind(this);
    this.handleBrightness = this.handleBrightness.bind(this);
    this.renderScanDevices = this.renderScanDevices.bind(this);
    this.renderControlledDevice = this.renderControlledDevice.bind(this);
    this.listControlledDevices = this.listControlledDevices.bind(this);
    this.handleDisconnectDevice = this.handleDisconnectDevice.bind(this);
  }

  componentDidMount() {
    this.listGateway();
    setInterval(() => {
      this.listGateway();
    }, 5000);
  }

  componentWillReceiveProps(nextProps) {
    const { smartCity } = this.props;
    if (nextProps.smartCity.gatewayList.length !== smartCity.gatewayList.length) {
      nextProps.smartCity.gatewayList.forEach((gateway) => {
        this.listControlledDevices(gateway.id);
      });
    }
  }

  listGateway() {
    const { dispatch } = this.props;
    dispatch(socketScanGateway());
  }

  listControlledDevices(gatewayId) {
    const { dispatch } = this.props;
    dispatch(listControlledDevices(gatewayId));
  }

  handleScanDevice(gatewayId) {
    console.log('scan device : ', gatewayId);
    const { dispatch } = this.props;
    dispatch(socketScanDevice(gatewayId));
  }

  handleConnectDevice(gatewayId, address, name) {
    const { dispatch } = this.props;
    dispatch(socketConnectDevice(gatewayId, address, name));
  }

  handleBrightness(gatewayId, address, name, b) {
    const { dispatch } = this.props;
    dispatch(socketBrightness(gatewayId, address, name, b));
  }

  handleDisconnectDevice(gatewayId, address, name) {
    const { dispatch } = this.props;
    dispatch(socketDisconnectDevice(gatewayId, address, name));
  }

  renderScanDevices(gateway) {
    return gateway.scanDevices.map((device) => {
      return (
        <div className="item" key={device.module.address} >
          <div className="right floated content" >
            <div
              className={(device.isConnecting)?
              'ui loading button' :
              'ui button'}
              onClick={() => {this.handleConnectDevice(gateway.id, device.module.address, device.module.name)}}
            >
              Connect
            </div>
          </div>
          <div className="content" >
            {device.module.name}
          </div>
        </div>
      )
    });
  }

  renderControlledDevice(gateway) {
    return gateway.controlledDevices.map((device) => {
      return (
        <div className="item" key={device.address} >
          <div className="right floated content" >
            <div
              className="positive ui button"
              onClick={() => {this.handleBrightness(gateway.id, device.address, device.name, 255)}}
            >
              Open Light
            </div>
            <div
              className="negative ui button"
              onClick={() => {this.handleBrightness(gateway.id, device.address, device.name, 0)}}
            >
              Off Light
            </div>
          </div>
          <div className="content" >
            <p>
              <button
                className="ui icon button"
                onClick={() => {this.handleDisconnectDevice(gateway.id, device.address, device.name)}}
              >
                <i className="remove icon" ></i>
              </button>
              {device.name}
            </p>
          </div>
        </div>
      )
    })
  }

  render() {
    const { smartCity } = this.props;
    const gatewayList = smartCity.gatewayList.map(gateway => {
      return (
        <tr key={gateway.id} >
          <td className="collapsing" >{gateway.id}</td>
          <td className="collapsing" >{gateway.ip}</td>
          <td className="collapsing" >{`${gateway.latitude},${gateway.longitude}`}</td>
          <td>
            <button
              className={(gateway.scanningDevice)?
              'ui top attached  fluid primary loading button' :
              'ui top attached  fluid primary button'}
              onClick={() => this.handleScanDevice(gateway.id)}
            >
              Scan Device
            </button>
            <div className="ui attached segment" >
              <div className="ui middle aligned divided list" >
                {this.renderScanDevices(gateway)}
              </div>
            </div>
          </td>
          <td>
            <div className="ui middle aligned divided list" >
              {this.renderControlledDevice(gateway)}
            </div>
          </td>
        </tr>
      )
    });
    return (
      <div>
        <table className="ui blue celled padded table" >
          <thead>
          <tr>
            <th>Gateway ID</th>
            <th>IP</th>
            <th>Coordinate</th>
            <th>Action</th>
            <th>Controllable Devices</th>
          </tr>
          </thead>
          <tbody>
          {gatewayList}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    smartCity: state.smartCity,
  }
}

export default connect(mapStateToProps)(LightControlDashBoard);