'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _vduxUi = require('vdux-ui');

var _jssSimple = require('jss-simple');

var _jssSimple2 = _interopRequireDefault(_jssSimple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Homepage content block
 */

function render() {
  return (0, _element2.default)(
    'div',
    null,
    (0, _element2.default)(
      'h1',
      { 'class': slogan },
      'Teach Better, Together.'
    ),
    (0, _element2.default)(
      'h4',
      { 'class': tagline },
      'Create and share educational activities with colleagues and students'
    ),
    (0, _element2.default)(_vduxUi.Icon, { 'class': play, name: 'play_circle_fill' })
  );
}

/**
 * Styles
 */

/**
 * Imports
 */

var _css = (0, _jssSimple2.default)({
  slogan: {
    font: '600 65px/65px Lato,Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif'
  },
  tagline: {
    maxWidth: 600,
    lineHeight: '36px',
    fontSize: 28,
    margin: 'auto auto 12px'
  },
  play: {
    cursor: 'pointer',
    opacity: 0.85,
    fontSize: 90,
    '&:hover': {
      opacity: 1
    }
  }
}, __filename + '_1');

var slogan = _css.slogan;
var tagline = _css.tagline;
var play = _css.play;

/**
 * Exports
 */

exports.default = render;