'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vduxUi = require('vdux-ui');

var _HomeOwl = require('components/HomeOwl');

var _HomeOwl2 = _interopRequireDefault(_HomeOwl);

var _assets = require('lib/assets');

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _jssSimple = require('jss-simple');

var _jssSimple2 = _interopRequireDefault(_jssSimple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/layouts/Home/Nav.js',
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
 * Menu
 */

var links = {
  About: 'http://about.weo.io',
  Training: 'http://about.weo.io/training/',
  Blog: 'http://about.weo.io/blog/',
  Help: 'http://about.weo.io/help/'
};

/**
 * Render
 */

function render() {
  return (0, _element2.default)(
    _vduxUi.Flex,
    { align: 'start center', flex: true, color: 'white', py: 2 },
    (0, _element2.default)(_HomeOwl2.default, null),
    (0, _keys2.default)(links).map(item)
  );
}

function item(text) {
  return (0, _element2.default)(
    _vduxUi.Block,
    { tag: 'a', href: links[text], p: 13, 'class': hover },
    (0, _element2.default)(
      _vduxUi.Text,
      { transform: 'uppercase', weight: '400', lh: '1em', letterSpacing: '2px', antialiased: true },
      text
    )
  );
}

/**
 * Styles
 */

var _css = (0, _jssSimple2.default)({
  hover: {
    color: '#fff',
    transition: 'color 0.1s 0s ease-in-out',
    '&:hover': {
      color: '#9c9999'
    }
  }
}, __filename + '_1');

var hover = _css.hover;

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({ render: render });