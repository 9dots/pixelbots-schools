'use strict';

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vduxUi = require('vdux-ui');

var _vduxDropdown = require('vdux-dropdown');

var _vduxDropdown2 = _interopRequireDefault(_vduxDropdown);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _map = require('@f/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/components/ClassNav/ClassNav.js',
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
 * <ClassNav/>
 */

function render(_ref) {
  var props = _ref.props;
  var children = _ref.children;
  var _props$classes = props.classes;
  var classes = _props$classes === undefined ? [] : _props$classes;


  return (0, _element2.default)(
    _vduxDropdown2.default,
    { btn: (0, _element2.default)(
        'div',
        null,
        children
      ), bg: 'white', color: 'black', style: { maxHeight: 350, overflow: 'auto' } },
    (0, _element2.default)(
      _vduxUi.Block,
      { bg: 'transparent' },
      (0, _element2.default)(_vduxUi.Input, { type: 'search', placeholder: 'Filter classes…' })
    ),
    (0, _map2.default)(classItem, classes)
  );
}

function classItem(cls) {
  return (0, _element2.default)(
    _vduxUi.Text,
    { transform: 'capitalize', color: 'text_color', py: 'm', px: 's' },
    (0, _element2.default)(
      _vduxUi.Text,
      { inlineBlock: true, circle: true, mx: 's', bg: 'green', color: 'white', lh: '25px', transform: 'uppercase', style: { textAlign: 'center' } },
      cls.displayName[0]
    ),
    (0, _element2.default)(
      _vduxUi.Text,
      { ellipsis: true },
      cls.displayName
    )
  );
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});