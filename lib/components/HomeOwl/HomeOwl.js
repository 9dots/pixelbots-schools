'use strict';

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _assets = require('lib/assets');

var _vduxUi = require('vdux-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/components/HomeOwl/HomeOwl.js',
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
 * <HomeOwl/>
 */

function render() {
  return (0, _element2.default)(
    _vduxUi.Flex,
    { tag: 'a', align: 'start center', mr: 12, href: '/' },
    (0, _element2.default)('img', { src: _assets.logo120, width: '28' })
  );
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});