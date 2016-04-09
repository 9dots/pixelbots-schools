'use strict';

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vduxUi = require('vdux-ui');

var _reduxEffectsLocation = require('redux-effects-location');

var _Home = require('layouts/Home');

var _Home2 = _interopRequireDefault(_Home);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _Content = require('./Content');

var _Content2 = _interopRequireDefault(_Content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/pages/Home/Home.js',
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
 * Home Page
 */

function render(_ref) {
  var props = _ref.props;

  return (0, _element2.default)(
    _Home2.default,
    { action: 'login' },
    (0, _element2.default)(
      _vduxUi.Flex,
      { column: true, align: 'center center', color: 'white', style: { maxWidth: 714, textAlign: 'center' } },
      (0, _element2.default)(_Content2.default, null),
      (0, _element2.default)(
        _vduxUi.Flex,
        { align: 'center center', my: 'm', mx: 's', pt: 'm', wide: true },
        (0, _element2.default)(
          _vduxUi.Box,
          { flex: '35%' },
          (0, _element2.default)(
            _vduxUi.Button,
            { pill: true, mr: 'm', bg: 'green', wide: true, onClick: function onClick(e) {
                return (0, _reduxEffectsLocation.setUrl)('/teacher');
              } },
            (0, _element2.default)(
              _vduxUi.Text,
              { lh: '47px', fs: '14px', weight: 'bolder' },
              'Teachers, Sign Up'
            )
          )
        ),
        (0, _element2.default)(
          _vduxUi.Box,
          { flex: '35%' },
          (0, _element2.default)(
            _vduxUi.Button,
            { id: 'students', pill: true, ml: 'm', mr: 's', my: 'm', wide: true, onClick: function onClick(e) {
                return (0, _reduxEffectsLocation.setUrl)('/student');
              } },
            (0, _element2.default)(
              _vduxUi.Text,
              { lh: '47px', fs: '14px', weight: 'bolder' },
              'Students, Join Class'
            )
          )
        )
      )
    )
  );
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});