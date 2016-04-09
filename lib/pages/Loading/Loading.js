'use strict';

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('lib/colors');

var _vduxUi = require('vdux-ui');

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _times = require('@f/times');

var _times2 = _interopRequireDefault(_times);

var _jssSimple = require('jss-simple');

var _jssSimple2 = _interopRequireDefault(_jssSimple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/pages/Loading/Loading.js',
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
 * Loading
 */

function render(_ref) {
  var props = _ref.props;

  return (0, _element2.default)(
    'span',
    { 'class': loader, style: { textAlign: 'center' } },
    (0, _element2.default)(
      _vduxUi.Block,
      { mt: 'm' },
      (0, _element2.default)(
        _vduxUi.Text,
        { lh: '30px', weight: 'lighter' },
        'Loading…'
      )
    ),
    (0, _element2.default)(
      _vduxUi.Block,
      { mt: 'm', pt: 'm' },
      (0, _times2.default)(4, function (i) {
        return (0, _element2.default)('div', { 'class': dot, style: dotStyle(i) });
      })
    )
  );
}

/**
 * Style
 */

var colors = [_colors.red, _colors.yellow, _colors.green, _colors.blue];

function dotStyle(i) {
  return {
    backgroundColor: colors[i],
    animationDelay: 0.1 * (i + 1) + 's'
  };
}

var _css = (0, _jssSimple2.default)({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    width: 200,
    height: 100
  },
  dot: {
    margin: '0px 3px',
    display: 'inline-block',
    height: 15,
    width: 15,
    borderRadius: '50%',
    animation: 'wave 2s infinite ease-in-out',
    transform: 'translateY(0)'
  },
  '@keyframes wave': {
    '0%, 60%, 100%': {
      opacity: 0.25,
      transform: 'translateY(0)'
    },
    '20%': {
      opacity: 0.75,
      transform: 'translateY(13px)'
    },
    '40%': {
      opacity: 0.75,
      transform: 'translateY(-13px)'
    }
  }
}, __filename + '_1');

var dot = _css.dot;
var loader = _css.loader;

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});