'use strict';
/**
 * Created by Ben Hu on 2016/3/4.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


class Main extends Component {
  render() {
    return (
      <div>
        <div className="ui basic vertical segment" id="banner" >
          <div className="ui container" >
            <h1 className="ui inverted center aligned header" >
                        <span className="company" >
                            Internet of Things
                        </span>
                        <span className="tagline" >
                           IOT Cloud Platform.Microservices Architecture.
                        </span>
            </h1>
          </div>
        </div>
        <div className="ui basic vertical very padded segment feature" id="microservice" >
          <div className="ui container" >
            <h2 className="ui header" >Unified Microservices</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel tincidunt eros,
              nec venenatis ipsum. Nulla hendrerit urna ex, id sagittis mi scelerisque vitae.
              Vestibulum posuere rutrum interdum. Sed ut ullamcorper odio, non pharetra eros. Aenean
              sed lacus sed enim ornare vestibulum quis a felis. Sed cursus nunc sit amet mauris
              sodales tempus. Nullam mattis, dolor non posuere commodo, sapien ligula hendrerit
              orci, non placerat erat felis vel dui. Cras vulputate ligula ut ex tincidunt
              tincidunt. Maecenas eget gravida lorem. Nunc nec facilisis risus. Mauris congue elit
              sit amet elit varius mattis. Praesent convallis placerat magna, a bibendum nibh
              lacinia non.</p>
          </div>
        </div>
        <div className="ui divider" ></div>
        <div className="ui basic vertical very padded segment feature"
             id="communication-architecture" >
          <div className="ui container" >
            <h2 className="ui header" >Communication Architecture</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel tincidunt eros,
              nec venenatis ipsum. Nulla hendrerit urna ex, id sagittis mi scelerisque vitae.
              Vestibulum posuere rutrum interdum. Sed ut ullamcorper odio, non pharetra eros. Aenean
              sed lacus sed enim ornare vestibulum quis a felis. Sed cursus nunc sit amet mauris
              sodales tempus. Nullam mattis, dolor non posuere commodo, sapien ligula hendrerit
              orci, non placerat erat felis vel dui. Cras vulputate ligula ut ex tincidunt
              tincidunt. Maecenas eget gravida lorem. Nunc nec facilisis risus. Mauris congue elit
              sit amet elit varius mattis. Praesent convallis placerat magna, a bibendum nibh
              lacinia non.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Main);