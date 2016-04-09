'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jssSimple = require('jss-simple');

var _jssSimple2 = _interopRequireDefault(_jssSimple);

var _vduxUi = require('vdux-ui');

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _scroll = require('middleware/scroll');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Floating arrow
 */

/**
 * Imports
 */

function render() {
  return (0, _element2.default)(_vduxUi.Icon, {
    name: 'keyboard_arrow_down',
    'class': arrow,
    onClick: function onClick(e) {
      return (0, _scroll.scrollTo)('#students');
    } });
}

/**
 * Styles
 */

var _css = (0, _jssSimple2.default)({
  arrow: {
    cursor: 'pointer',
    position: 'absolute',
    left: '0',
    right: '0',
    bottom: '50px',
    margin: 'auto',
    width: '70px',
    height: '70px',
    fontSize: '70px',
    lineHeight: '70px',
    color: 'rgba(255,255,255,0.9)',
    textShadow: '0 1px 2px rgba(52,52,52,0.3)',
    transition: 'all 0.35s',
    animation: '3.5s swing infinite'
  },
  '@keyframes swing': {
    '0%': { transform: 'translateY(0)' },
    '40%': { transform: 'translateY(25px)' },
    '60%': { transform: 'translateY(25px)' },
    '100%': { transform: 'translateY(0)' }
  }
}, __filename + '_1');

var arrow = _css.arrow;

/**
 * Exports
 */

exports.default = render;