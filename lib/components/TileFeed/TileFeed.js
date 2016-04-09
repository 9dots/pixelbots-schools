'use strict';

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActivityTile = require('components/ActivityTile');

var _ActivityTile2 = _interopRequireDefault(_ActivityTile);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _vduxUi = require('vdux-ui');

var _map = require('@f/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/components/TileFeed/TileFeed.js',
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
 * Tile feed
 */

function render(_ref) {
  var props = _ref.props;
  var items = props.items;


  return (0, _element2.default)(
    _vduxUi.Grid,
    null,
    (0, _map2.default)(function (activity) {
      return (0, _element2.default)(_ActivityTile2.default, { activity: activity });
    }, items)
  );
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});