'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Home = require('layouts/Home');

var _Home2 = _interopRequireDefault(_Home);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _jssSimple = require('jss-simple');

var _jssSimple2 = _interopRequireDefault(_jssSimple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Student signup page
 */

function render() {
  return (0, _element2.default)(
    _Home2.default,
    { action: 'login' },
    (0, _element2.default)('div', null)
  );
}

/**
 * Exports
 */

/**
 * Imports
 */

exports.default = render;