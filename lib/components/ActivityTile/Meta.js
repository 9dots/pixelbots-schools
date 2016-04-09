'use strict';

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CommoncoreBadge = require('components/CommoncoreBadge');

var _CommoncoreBadge2 = _interopRequireDefault(_CommoncoreBadge);

var _vduxUi = require('vdux-ui');

var _Avatar = require('components/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _styles = require('lib/styles');

var _filter = require('@f/filter');

var _filter2 = _interopRequireDefault(_filter);

var _map = require('@f/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/components/ActivityTile/Meta.js',
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
 * Meta bar
 */

function render(_ref) {
  var props = _ref.props;
  var activity = props.activity;
  var commonCore = activity.commonCore;
  var actor = activity.actor;

  var board = getBoard(activity);

  return (0, _element2.default)(
    _vduxUi.Block,
    { px: 12, py: 6, mt: 12, fs: 'xxs', borderTop: 'rgba(0, 0, 0, 0.04)', bgColor: '#FCFCFC' },
    (0, _element2.default)(
      _vduxUi.Flex,
      { align: 'start center' },
      (0, _element2.default)(_Avatar2.default, { mr: 's', actor: actor }),
      (0, _element2.default)(
        _vduxUi.Box,
        { flex: true, ellipsis: true, lh: '18px' },
        (0, _element2.default)(
          _vduxUi.Flex,
          { column: true, align: 'space-around' },
          (0, _element2.default)(
            _vduxUi.Text,
            { 'class': _styles.link, bold: true },
            actor.displayName
          ),
          (0, _element2.default)(
            _vduxUi.Text,
            null,
            board.displayName
          )
        )
      ),
      (0, _element2.default)(
        _vduxUi.Box,
        null,
        (0, _element2.default)(_CommoncoreBadge2.default, null)
      )
    )
  );
}

/**
 * Helpers
 */

function getBoard(activity) {
  var ctx = activity.contexts[1];
  return ctx && ctx.descriptor.id !== 'me' && ctx.descriptor;
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});