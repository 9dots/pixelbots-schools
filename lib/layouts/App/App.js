'use strict';

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _jssSimple = require('jss-simple');

var _jssSimple2 = _interopRequireDefault(_jssSimple);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/layouts/App/App.js',
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
 * App
 */

function render(_ref) {
  var props = _ref.props;
  var children = _ref.children;

  return (0, _element2.default)(
    'div',
    null,
    (0, _element2.default)(_Nav2.default, props),
    children
  );
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});