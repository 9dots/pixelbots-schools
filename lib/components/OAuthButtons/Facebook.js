'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vduxContainers = require('vdux-containers');

var _vduxUi = require('vdux-ui');

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _assets = require('lib/assets');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/components/OAuthButtons/Facebook.js',
  components: _components,
  locals: [],
  imports: []
});

function _wrapComponent(id) {
  return function (Component) {
    return _vduxTransformHmr2(Component, id);
  };
} /**
   * Imports
   */

/**
 * Facebook OAuth Button
 */

function render(_ref) {
  var props = _ref.props;
  var children = _ref.children;

  return (0, _element2.default)(
    Button,
    (0, _extends3.default)({ ui: _vduxUi.IconButton, fs: '12px', img: _assets.fbIcon, logoSize: '18px', pl: '8px', bgColor: 'facebook_blue' }, props),
    children
  );
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});