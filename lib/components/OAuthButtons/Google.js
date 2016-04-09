'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vduxContainers = require('vdux-containers');

var _assets = require('lib/assets');

var _vduxUi = require('vdux-ui');

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Google OAuth Button
 */

/**
 * Imports
 */

function render(_ref) {
  var props = _ref.props;
  var children = _ref.children;

  return (0, _element2.default)(
    _vduxContainers.Button,
    (0, _extends3.default)({ ui: _vduxUi.IconButton, fs: '12px', img: _assets.gplusIcon, bgColor: 'google_red' }, props),
    children
  );
}

/**
 * Exports
 */

exports.default = render;