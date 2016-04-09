'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ellipsis = exports.placeholder = exports.textInput = exports.link = exports.rect = exports.circle = exports.btn = exports.pointer = undefined;

var _colors = require('lib/colors');

var colors = _interopRequireWildcard(_colors);

var _fontSizes = require('./font-sizes');

var _rgba = require('@f/rgba');

var _rgba2 = _interopRequireDefault(_rgba);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Style mixins
 */

function pointer() {
  return {
    cursor: pointer,
    userSelect: 'none'
  };
} /**
   * Imports
   */

function btn() {
  var bg = arguments.length <= 0 || arguments[0] === undefined ? '#363D43' : arguments[0];
  var color = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  if (colors[bg]) bg = colors[bg];
  if (bg === colors.red) color = '#FFF';
  if (!color) color = isLight(bg) ? '#333' : '#FFF';

  return (0, _extends3.default)({}, pointer(), {
    display: 'inline-block',
    color: (0, _rgba2.default)(color, 0.85),
    backgroundColor: bg,
    transition: 'background-color .3s, color .3s',
    padding: '0px 25px',
    marginBottom: 0,
    height: '2.3em',
    fontSize: _fontSizes.xs,
    lineHeight: '2.1em',
    textAlign: 'center',
    borderRadius: 3,
    whiteSpace: 'nowrap',
    outline: 0,
    '&.rounded': {
      borderRadius: 50
    },
    '&.hover, &.focus, &[aria-expanded=true]': {
      color: (0, _rgba2.default)(color, 1)
    },
    '&:focus': {
      border: '1px solid ' + (0, _rgba2.default)(0, 0, 0, 0.15)
    },
    '&:active, &.active': {
      backgroundImage: 'none',
      color: color,
      borderColor: (0, _rgba2.default)(0, 0, 0, 0.06),
      backgroundColor: bg
    }
  });
}

function circle(size) {
  return {
    height: size,
    width: size,
    borderRadius: '50%',
    textAlign: 'center'
  };
}

function rect(width) {
  var height = arguments.length <= 1 || arguments[1] === undefined ? width : arguments[1];

  return {
    width: width,
    height: height
  };
}

function link() {
  var color = arguments.length <= 0 || arguments[0] === undefined ? colors.text_color : arguments[0];

  return (0, _extends3.default)({
    color: (0, _rgba2.default)(color, 0.85)
  }, pointer(), {
    textDecoration: 'underline',
    transition: 'color .3s',
    '&:hover': {
      color: (0, _rgba2.default)(color, 1)
    },
    '&:active': {
      color: (0, _rgba2.default)(color, 0.85)
    }
  });
}

function placeholder(style) {
  return {
    '&:-moz-placeholder': style,
    '&::-moz-placeholder': style,
    '&:-ms-input-placeholder': style,
    '&::-webkit-input-placeholder': style
  };
}

function textInput(height) {
  var obj = (0, _extends3.default)({
    borderRadius: 0,
    resize: 'none',
    background: 'transparent',
    outline: 0,
    color: '#777',
    padding: '7px 0 8px',
    boxShadow: '0 0',
    border: 0,
    borderBottom: '1px solid rgba(' + colors.grey + ', .15)'
  }, placeholder({ color: colors.placeholder_color }), {
    '&:focus': {
      padding: '7px 0',
      borderBottom: '2px solid ' + colors.blue,
      '&.invalid.dirty': {
        borderBottomColor: colors.red
      }
    }
  });

  if (height) {
    obj.minHeight = height;
  }

  return textInput;
}

function ellipsis() {
  return {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };
}

/**
 * Exports
 */

exports.pointer = pointer;
exports.btn = btn;
exports.circle = circle;
exports.rect = rect;
exports.link = link;
exports.textInput = textInput;
exports.placeholder = placeholder;
exports.ellipsis = ellipsis;