'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vduxUi = require('vdux-ui');

var _ActionButton = require('./ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constants
 */

/**
 * Imports
 */

var buttons = {
  login: (0, _element2.default)(
    _ActionButton2.default,
    { link: '/login/' },
    'LOG IN'
  ),
  signup: (0, _element2.default)(
    _ActionButton2.default,
    { link: '/' },
    'SIGN UP'
  )
};

/**
 * Home Header
 */

function render(_ref) {
  var props = _ref.props;
  var action = props.action;

  var button = buttons[action];

  return (0, _element2.default)(
    _vduxUi.Flex,
    { tag: 'header', align: 'start center', wide: true, py: '4px', px: '30px', z: 1, flex: true, absolute: true, h: '53px', bgColor: 'rgba(255, 255, 255, 0.2)' },
    (0, _element2.default)(_Nav2.default, null),
    (0, _element2.default)(
      _vduxUi.Text,
      { tag: 'a', href: '/', ml: 'm', color: 'off_white', fs: 'm', bold: true, style: { letterSpacing: 1 } },
      'WEO'
    ),
    (0, _element2.default)(
      _vduxUi.Flex,
      { flex: true, align: 'end center' },
      button
    )
  );
}

/**
 * Exports
 */

exports.default = render;