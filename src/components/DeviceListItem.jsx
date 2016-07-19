'use strict';
/**
 * Created by Ben Hu on 2016/3/5.
 */
import React, { Component, PropTypes } from 'react';

export default class DeviceListItem extends Component {
  constructor(props) {
    super(props);
  }

  handleConnectClick(address) {
    this.props.handleConnect(address);
  }

  render() {
    const { device } = this.props;
    return (
      <div className="item" >
        <div className="right floated content" >
          <button
            className={(device.connected) ? 'ui basic blue disabled button' : 'ui basic blue button'}
            onClick={this.handleConnectClick.bind(this,device.address)}
          >
            {(device.connected) ? 'Connected' : 'Connect'}
          </button>
        </div>
        <div className="content" >
          <div className="header" >{device.name}</div>
          {device.address}
        </div>
      </div>
    )
  }
}

DeviceListItem.propTypes = {
  device: PropTypes.object,
  handleConnect: PropTypes.func.isRequired
};