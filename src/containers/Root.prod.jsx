'use strict';
/**
 * Created by Ben Hu on 2016/3/5.
 */
import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../../routes';

import App from './App';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store} >
        <div>
          <Router history={history} routes={routes} />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
