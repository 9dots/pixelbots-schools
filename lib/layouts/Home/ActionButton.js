'use strict';

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vduxUi = require('vdux-ui');

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/layouts/Home/ActionButton.js',
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
 * Render
 */

function render(_ref) {
  var props = _ref.props;
  var children = _ref.children;
  var link = props.link;


  return (0, _element2.default)(
    _vduxUi.Block,
    { tag: 'a', href: link, pointer: true, border: 'white', borderWidth: '2px', py: '4px', px: '12px', opacity: '0.8' },
    (0, _element2.default)(
      _vduxUi.Text,
      { antialiased: true, lh: '21px', color: 'white', weight: '400' },
      children
    )
  );
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({ render: render });