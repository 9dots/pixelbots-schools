'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _OAuthButtons = require('components/OAuthButtons');

var _vduxUi = require('vdux-ui');

var _BlockInput = require('components/BlockInput');

var _BlockInput2 = _interopRequireDefault(_BlockInput);

var _Home = require('layouts/Home');

var _Home2 = _interopRequireDefault(_Home);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _styles = require('lib/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Teacher signup page
 */

/**
 * Imports
 */

function render() {
  return (0, _element2.default)(
    _Home2.default,
    { action: 'login' },
    (0, _element2.default)(
      _vduxUi.Flex,
      null,
      (0, _element2.default)(
        _vduxUi.Flex,
        { column: true, w: 'col_med', color: 'white', align: 'center' },
        (0, _element2.default)(
          _vduxUi.Block,
          { mt: '-30px', fs: 'xl', mb: 'm' },
          'Welcome to Weo'
        ),
        (0, _element2.default)(
          _vduxUi.Block,
          { ln: '30px', fs: 'm' },
          'Join our growing community',
          (0, _element2.default)('br', null),
          'of edudcators today.'
        ),
        (0, _element2.default)(
          _vduxUi.Block,
          { fs: 's', mt: 'm' },
          'Free for teachers. Forever.'
        )
      ),
      (0, _element2.default)(
        _vduxUi.Block,
        { w: 'col_sm', color: 'white' },
        (0, _element2.default)(_BlockInput2.default, { placeholder: 'FULL NAME' }),
        (0, _element2.default)(_BlockInput2.default, { placeholder: 'EMAIL' }),
        (0, _element2.default)(_BlockInput2.default, { placeholder: 'PASSWORD', type: 'password' }),
        (0, _element2.default)(
          _vduxUi.Button,
          { 'class': _styles.hover, wide: true, bgColor: 'green', h: 43, mt: 10, lh: '43px', fs: 15 },
          'Sign Up Now'
        ),
        (0, _element2.default)(
          _vduxUi.Flex,
          { align: 'space-around center', m: 'm' },
          (0, _element2.default)(_vduxUi.DecoLine, { w: '36%' }),
          'or',
          (0, _element2.default)(_vduxUi.DecoLine, { w: '36%' })
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
        )
      )
    )
  );
}

/**
 * Exports
 */

exports.default = render;