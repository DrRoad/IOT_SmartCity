'use strict';
/**
 * Created by Ben Hu on 2016/3/4.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { scanDevice } from '../actions';
import { push, go } from 'react-router-redux';

class DashBoard extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(push('/dashboard/lightcontrol'));
  }

  render() {
    const { children } = this.props;

    return (
      <div className="ui basic segment" >
        <div className="ui fluid container" >
          <div className="ui grid" >
            <div className="sixteen wide column" >
              {children}
            </div>
          </div>
        </div>
      </div>

    )
  }
}

DashBoard.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  // Injected by React Router
  children: PropTypes.node
};

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
    routing: state.routing.locationBeforeTransitions
  }
}

export default connect(mapStateToProps)(DashBoard);