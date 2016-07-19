'use strict';
/**
 * Created by Ben Hu on 2016/3/4.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Menu from '../components/Menu';

class App extends Component {
  render() {
    const { children, routing } = this.props;
    return (
      <div>
        <Menu path={routing.pathname} />
        <div id="content" >
          {children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
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

export default connect(mapStateToProps)(App)