'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('lib/config');

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Resize an image using our resizing server
 */

/**
 * Imports
 */

function resize(url) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (typeof opts === 'number') opts = { width: opts };

  return [_config.imageResize, _qs2.default.stringify((0, _extends3.default)({}, opts, { url: url }))].filter(Boolean).join('?');
}

/**
 * Exports
 */

exports.default = resize;