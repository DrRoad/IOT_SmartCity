'use strict';
/**
 * Created by Ben Hu on 2016/3/3.
 */
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureStore.prod');
} else {
    module.exports = require('./configureStore.dev');
}