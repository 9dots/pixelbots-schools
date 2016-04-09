'use strict';

var _jss = require('./jss');

var _jss2 = _interopRequireDefault(_jss);

require('babel-runtime/regenerator/runtime');

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Polyfills
 */

_es6Promise2.default.polyfill();

/**
 * Boot app
 */

/**
 * Imports
 */

require('./main');