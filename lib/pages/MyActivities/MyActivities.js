'use strict';

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TileFeed = require('components/TileFeed');

var _TileFeed2 = _interopRequireDefault(_TileFeed);

var _App = require('layouts/App');

var _App2 = _interopRequireDefault(_App);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _map = require('@f/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/pages/MyActivities/MyActivities.js',
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
 * myActivities
 */

function render(_ref) {
  var props = _ref.props;

  return (0, _element2.default)(
    _App2.default,
    props,
    (0, _element2.default)(
      'div',
      null,
      'Hello world'
    )
  );
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});