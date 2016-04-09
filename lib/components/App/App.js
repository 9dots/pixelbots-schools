'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Router = require('components/Router');

var _Router2 = _interopRequireDefault(_Router);

var _reducer = require('reducer');

var _Loading = require('pages/Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _jssSimple = require('jss-simple');

var _jssSimple2 = _interopRequireDefault(_jssSimple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [onCreate].map(_regenerator2.default.mark);

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/components/App/App.js',
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
 * Root app component
 */

function onCreate(_ref) {
  var props = _ref.props;
  return _regenerator2.default.wrap(function onCreate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _reducer.initializeApp)(props.state.ready);

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function render(_ref2) {
  var props = _ref2.props;

  return isReady(props.state) ? (0, _element2.default)(_Router2.default, props.state) : (0, _element2.default)(_Loading2.default, null);
}

/**
 * Helpers
 */

function isReady(state) {
  return state.ready;
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  onCreate: onCreate,
  render: render
});