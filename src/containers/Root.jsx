'use strict';
/**
 * Created by Ben Hu on 2016/3/3.
 */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Root.prod');
} else {
  module.exports = require('./Root.dev');
}





