'use strict';

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FloatingArrow = require('./FloatingArrow');

var _FloatingArrow2 = _interopRequireDefault(_FloatingArrow);

var _InfoBlocks = require('./InfoBlocks');

var _InfoBlocks2 = _interopRequireDefault(_InfoBlocks);

var _vduxUi = require('vdux-ui');

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _assets = require('lib/assets');

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/layouts/Home/Home.js',
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
 * Home Layout
 */

function render(_ref) {
  var props = _ref.props;
  var children = _ref.children;
  var action = props.action;


  return (0, _element2.default)(
    _vduxUi.Block,
    { bg: '#fdfdfd' },
    (0, _element2.default)(_Header2.default, { action: action }),
    (0, _element2.default)(
      _vduxUi.Flex,
      { wide: true, align: 'center center', bg: 'url(' + _assets.chalk + ') center bottom/cover', absolute: true, h: '100vh' },
      children,
      (0, _element2.default)(_FloatingArrow2.default, null)
    ),
    (0, _element2.default)(_InfoBlocks2.default, null)
  );
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});