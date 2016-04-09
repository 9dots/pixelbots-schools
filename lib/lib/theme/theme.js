'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('lib/colors');

var colors = _interopRequireWildcard(_colors);

var _vduxUi = require('vdux-ui');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Theme
 */

/**
 * Imports
 */

var theme = {
  colors: (0, _extends3.default)({}, _vduxUi.defaultTheme.colors, colors),
  scale: {
    z: 0,
    xs: 3,
    s: 6,
    m: 12,
    l: 24,
    xl: 32,
    xxl: 64,
    col_xsm: 200,
    col_sm: 360,
    col_med: 440,
    col_med: 440,
    col_lrg: 520,
    col_main: 968
  },
  fontScale: {
    xxs: 11,
    xs: 13,
    s: 17,
    m: 22,
    l: 30,
    xl: 45,
    xxl: 120
  }
};

/**
 * Exports
 */

exports.default = theme;