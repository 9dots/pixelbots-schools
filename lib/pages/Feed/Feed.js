'use strict';

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collections = require('reducer/collections');

var _TileFeed = require('components/TileFeed');

var _TileFeed2 = _interopRequireDefault(_TileFeed);

var _App = require('layouts/App');

var _App2 = _interopRequireDefault(_App);

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
  filename: 'src/pages/Feed/Feed.js',
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
 * onCreate - Load the following feed
 */

function onCreate() {
  return _collections.following.fetch();
}

/**
 * Following feed
 */

function render(_ref) {
  var props = _ref.props;
  var currentUser = props.currentUser;
  var collections = props.collections;
  var entities = props.entities;
  var _collections$followin = collections.following;
  var following = _collections$followin === undefined ? {} : _collections$followin;


  return (0, _element2.default)(
    _App2.default,
    props,
    (0, _element2.default)(
      _vduxUi.Block,
      { w: 'col_main', mt: 12, mx: 'auto' },
      following && !following.loading ? (0, _element2.default)(_TileFeed2.default, { items: (0, _map2.default)(function (id) {
          return entities[id];
        }, following.ids) }) : (0, _element2.default)(
        'span',
        null,
        'Loading...'
      )
    )
  );
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  onCreate: onCreate,
  render: render
});