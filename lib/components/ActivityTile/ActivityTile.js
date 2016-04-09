'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vduxUi = require('vdux-ui');

var _Figure = require('components/Figure');

var _Figure2 = _interopRequireDefault(_Figure);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _Meta = require('./Meta');

var _Meta2 = _interopRequireDefault(_Meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/components/ActivityTile/ActivityTile.js',
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
 * Activity Tile
 */

function render(_ref) {
  var props = _ref.props;
  var activity = props.activity;
  var image = activity.image;
  var displayName = activity.displayName;
  var description = activity.description;


  return (0, _element2.default)(
    _vduxUi.Card,
    { w: 230, relative: true, my: 8, mx: 6 },
    (0, _element2.default)(
      _vduxUi.Flex,
      { column: true },
      (0, _element2.default)('actions', null),
      (0, _element2.default)(_Figure2.default, (0, _extends3.default)({}, image, { thumb: true })),
      (0, _element2.default)(
        _vduxUi.Block,
        { textAlign: 'center', m: 'm' },
        (0, _element2.default)(
          _vduxUi.Text,
          { p: 'm', my: 's', fs: 's' },
          displayName
        ),
        (0, _element2.default)(
          _vduxUi.Text,
          { fs: 'xs' },
          description
        )
      ),
      (0, _element2.default)(_Meta2.default, { activity: activity })
    )
  );
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});