'use strict';
/**
 * Created by Ben Hu on 2016/3/4.
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Menu extends Component {
  render() {
    const { path } = this.props;
    return (
      <div className="ui blue pointing labeled icon top fixed menu" >
        <div className="ui fluid container" >
          <Link to="/" className={(path === '/')?'item active':'item'} >
            <i className="fa fa-home fa-2x" ></i>
            Home
          </Link>
          <Link to="/dashboard"
                className={(path.indexOf('/dashboard') !== -1)?'item active':'item'} >
            <i className="fa fa-gamepad fa-2x" ></i>
            Dashboard
          </Link>
        </div>
      </div>
    )
  }
}

Menu.propTypes = {
  path: PropTypes.string
};