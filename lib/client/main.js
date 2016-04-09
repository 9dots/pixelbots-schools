'use strict';

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _domready = require('@f/domready');

var _domready2 = _interopRequireDefault(_domready);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _app = require('components/app');

var _app2 = _interopRequireDefault(_app);

var _theme = require('lib/theme');

var _theme2 = _interopRequireDefault(_theme);

var _reducer = require('reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _dom = require('vdux/dom');

var _dom2 = _interopRequireDefault(_dom);

var _jss = require('./jss');

var _jss2 = _interopRequireDefault(_jss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Pre-rendered constants
 */

/**
 * Imports
 */

var prerendered = !!window.__initialState__;
var initialState = window.__initialState__ || {};

/**
 * Initialize app
 */

var _vdux = (0, _dom2.default)({
  middleware: _middleware2.default,
  reducer: _reducer2.default,
  initialState: initialState,
  prerendered: prerendered
});

var subscribe = _vdux.subscribe;
var render = _vdux.render;
var replaceReducer = _vdux.replaceReducer;
var getState = _vdux.getState;


_jss2.default.attach();

/**
 * Render loop
 */

(0, _domready2.default)(function () {
  return subscribe(app);
});

function app(state, forceUpdate) {
  render((0, _element2.default)(_app2.default, { state: state.app }), { uiTheme: _theme2.default }, forceUpdate);
}

/**
 * Hot module replacement
 */

if (module.hot) {
  module.hot.decline();
  module.hot.unaccepted(function () {
    return window.location.reload();
  });
  module.hot.accept(['components/app', 'reducer'], function () {
    _jss2.default.detach();
    require('components/app');
    replaceReducer(require('reducer').default);
    _jss2.default.attach();
    app(getState(), true);
  });
}