'use strict';

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ccbadge30x = require('./ccbadge30x30.png');

var _ccbadge30x2 = _interopRequireDefault(_ccbadge30x);

var _vduxTooltip = require('vdux-tooltip');

var _vduxTooltip2 = _interopRequireDefault(_vduxTooltip);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/components/CommoncoreBadge/CommoncoreBadge.js',
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
 * commoncoreBadge
 */

function render(_ref) {
  var props = _ref.props;
  var state = _ref.state;

  return (0, _element2.default)(
    _vduxTooltip2.default,
    { delay: 300, message: 'Common Core Aligned', space: 15 },
    (0, _element2.default)('img', { src: _ccbadge30x2.default })
  );
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});