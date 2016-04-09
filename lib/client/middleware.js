'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logLevel = require('lib/log-level');

var _reduxEphemeral = require('redux-ephemeral');

var _reduxEffectsCredentials = require('redux-effects-credentials');

var _reduxEffectsLocation = require('redux-effects-location');

var _reduxEffectsLocation2 = _interopRequireDefault(_reduxEffectsLocation);

var _normalize = require('middleware/normalize');

var _normalize2 = _interopRequireDefault(_normalize);

var _reduxEffectsEvents = require('redux-effects-events');

var _reduxEffectsEvents2 = _interopRequireDefault(_reduxEffectsEvents);

var _reduxEffectsCookie = require('redux-effects-cookie');

var _reduxEffectsCookie2 = _interopRequireDefault(_reduxEffectsCookie);

var _reduxEffectsFetch = require('redux-effects-fetch');

var _reduxEffectsFetch2 = _interopRequireDefault(_reduxEffectsFetch);

var _scroll = require('middleware/scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _weoReduxLogger = require('weo-redux-logger');

var _weoReduxLogger2 = _interopRequireDefault(_weoReduxLogger);

var _api = require('lib/api');

var _reduxFlo = require('redux-flo');

var _reduxFlo2 = _interopRequireDefault(_reduxFlo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Middleware
 */

/**
 * Imports
 */

var middleware = [(0, _reduxFlo2.default)(), (0, _reduxEffectsCookie2.default)(), (0, _reduxEffectsEvents2.default)(), (0, _reduxEffectsCredentials.query)(_api.isApiServer, 'access_token', function (state) {
  return state.app.auth && state.app.auth.token;
}), (0, _normalize2.default)(_api.isApiServer), _reduxEffectsFetch2.default, _scroll2.default, (0, _reduxEffectsLocation2.default)(), (0, _weoReduxLogger2.default)({
  predicate: function predicate(getState, action) {
    return (0, _logLevel.shouldLog)(action.meta && action.meta.logLevel || 'info');
  },
  stateTransformer: function stateTransformer(state, action) {
    return (0, _reduxEphemeral.isEphemeral)(action) ? (0, _reduxEphemeral.lookup)(state.ui, action.meta.ephemeral.key) : state;
  }
})];

window.setLogLevel = _logLevel.setLogLevel;

/**
 * Exports
 */

exports.default = middleware;