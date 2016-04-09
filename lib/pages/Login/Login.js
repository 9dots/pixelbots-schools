'use strict';

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vduxUi = require('vdux-ui');

var _OAuthButtons = require('components/OAuthButtons');

var _BlockInput = require('components/BlockInput');

var _BlockInput2 = _interopRequireDefault(_BlockInput);

var _currentUser = require('reducer/currentUser');

var _Home = require('layouts/Home');

var _Home2 = _interopRequireDefault(_Home);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _vduxButton = require('vdux-button');

var _vduxButton2 = _interopRequireDefault(_vduxButton);

var _styles = require('lib/styles');

var _vduxForm = require('vdux-form');

var _vduxForm2 = _interopRequireDefault(_vduxForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/pages/Login/Login.js',
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
 * Login page
 */

function render(_ref) {
  var props = _ref.props;

  return (0, _element2.default)(
    _Home2.default,
    { action: 'signup' },
    (0, _element2.default)(
      _vduxUi.Block,
      { w: 'col_sm', color: 'white', p: 'm' },
      (0, _element2.default)(
        _vduxForm2.default,
        { onSubmit: _currentUser.loginUser },
        (0, _element2.default)(_BlockInput2.default, { autofocus: true, placeholder: 'USERNAME OR EMAIL', name: 'username' }),
        (0, _element2.default)(_BlockInput2.default, { placeholder: 'PASSWORD', type: 'password', name: 'password' }),
        (0, _element2.default)(
          _vduxButton2.default,
          { type: 'submit', wide: true, bgColor: 'green', h: 43, mt: 10, lh: '43px', fs: 15 },
          'Log In'
        ),
        (0, _element2.default)(
          _vduxUi.Flex,
          { align: 'space-around center', m: 'm' },
          (0, _element2.default)(_vduxUi.DecoLine, { w: '36%' }),
          'or',
          (0, _element2.default)(_vduxUi.DecoLine, { w: '36%' })
        )
      ),
      (0, _element2.default)(
        _vduxUi.Flex,
        { align: 'space-between center', pt: 10 },
        (0, _element2.default)(
          _OAuthButtons.Google,
          { w: 'calc(50% - 6px)' },
          'Sign in With Google'
        ),
        (0, _element2.default)(
          _OAuthButtons.Facebook,
          { w: 'calc(50% - 6px)' },
          'Sign in With Facebook'
        )
      ),
      (0, _element2.default)(
        'a',
        { 'class': _styles.link, href: '/forgot' },
        (0, _element2.default)(
          _vduxUi.Block,
          { color: 'grey_light', mx: 'auto', mt: 'm', style: { textAlign: 'center' } },
          'Forgot your password?'
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