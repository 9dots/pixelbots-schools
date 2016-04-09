'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _vduxUi = require('vdux-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/components/BlockInput/BlockInput.js',
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
 * <BlockInput/>
 */

function render(_ref) {
  var props = _ref.props;

  return (0, _element2.default)(_vduxUi.Input, (0, _extends3.default)({
    wide: true,
    mb: 's',
    inputStyle: inputStyle,
    inputProps: { m: 'm' }
  }, props));
}

/**
 * Styles
 */

var inputStyle = {
  padding: '12px 14px',
  border: 0,
  color: '#666',
  fontSize: '13px',
  fontWeight: 500,
  outline: 0,
  background: '#ececec'
};

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});