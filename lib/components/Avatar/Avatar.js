'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('lib/config');

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _vduxUi = require('vdux-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/components/Avatar/Avatar.js',
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
 * Avatar component
 */

function render(_ref) {
  var props = _ref.props;
  var actor = props.actor;
  var circle = props.circle;
  var size = props.size;

  return (0, _element2.default)(_vduxUi.Avatar, (0, _extends3.default)({}, props, { hoverStyle: { width: 100 }, src: avatarUrl(actor) }));
}

/**
 * Helpers
 */

function avatarUrl(actor) {
  return _config.avatarServer + (actor.id || actor._id || actor);
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});