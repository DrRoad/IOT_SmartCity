'use strict';
/**
 * Created by Ben Hu on 2016/3/5.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  socketConnectDevice,
  socketScanDevice,
  socketStopScanDevice,
  socketOpenLight,
  socketOffLight,
  resetErrorMessage
} from '../actions';
import DeviceList from '../components/DeviceList';

class BluetoothDashBoard extends Component {
  constructor(props) {
    super(props);
    this.handleScan = this.handleScan.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleOpenLight = this.handleOpenLight.bind(this);
    this.handleOffLight = this.handleOffLight.bind(this);
    this.handleDismissClick = this.handleDismissClick.bind(this);
  }

  handleScan() {
    const { dispatch } = this.props;
    dispatch(socketScanDevice());
  }

  handleStopScan() {
    const { dispatch } = this.props;
    dispatch(socketStopScanDevice());
  }

  handleConnect(address) {
    const { dispatch } = this.props;
    dispatch(socketConnectDevice(address));
  }

  handleOpenLight() {
    const { dispatch } = this.props;
    dispatch(socketOpenLight());
  }

  handleOffLight() {
    const { dispatch } = this.props;
    dispatch(socketOffLight());
  }

  handleDismissClick() {
    const { dispatch } = this.props;
    dispatch(resetErrorMessage());
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;

    if (!errorMessage) {
      return null;
    } else {
      return (
        <div className="ui negative message" >
          <i className="close icon"
             onClick={this.handleDismissClick}
          >
          </i>
          <div className="header" >
            {errorMessage}
          </div>
        </div>
      )
    }
  }

  render() {
    const { deviceControl } = this.props;
    const { isScanning, isConnecting, devices } = deviceControl;

    return (
      <div className="ui container" >
        <div className="ui huge header" >藍牙燈光控制 Demo</div>
        <div className="ui divider" ></div>
        <button className={(isScanning)?'ui blue basic loading button':'ui blue basic button'}
                onClick={this.handleScan}
        >
          Scan Device
        </button>
        <button className="ui red basic button"
                onClick={this.handleStopScan}
        >
          Stop Scan Device
        </button>
        {this.renderErrorMessage()}
        <div className={(isConnecting)?'ui loading blue segment':'ui blue segment'}
             id="device-list" >
          <DeviceList
            devices={devices}
            handleConnect={this.handleConnect}
          />
        </div>
        <div className="ui divider" ></div>
        <div className="ui buttons" >
          <button className="ui button"
                  onClick={this.handleOpenLight}
          >
            On
          </button>
          <div className="or" ></div>
          <button className="ui positive button"
                  onClick={this.handleOffLight}
          >
            Off
          </button>
        </div>
      </div>
    )
  }
}

BluetoothDashBoard.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  deviceControl: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
    deviceControl: state.deviceControl
  }
}

export default connect(mapStateToProps)(BluetoothDashBoard);