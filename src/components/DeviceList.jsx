'use strict';
/**
 * Created by Ben Hu on 2016/3/5.
 */
import React, { Component, PropTypes } from 'react';
import DeviceListItem from './DeviceListItem';

export default class DeviceList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { devices } = this.props;
    const deviceListItem = devices.map(device=> {
      return (
        <DeviceListItem
          key={device.address}
          device={device}
          handleConnect={this.props.handleConnect}
        />
      )
    });

    return (
      <div className="ui middle aligned divided selection very relaxed list" >
        {deviceListItem}
      </div>
    )
  }
}

DeviceList.propTypes = {
  devices: PropTypes.array.isRequired,
  handleConnect: PropTypes.func.isRequired
};