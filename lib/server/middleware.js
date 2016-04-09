'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxFlo = require('redux-flo');

var _reduxFlo2 = _interopRequireDefault(_reduxFlo);

var _cookie = require('cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _api = require('lib/api');

var _reduxEffectsFetch = require('redux-effects-fetch');

var _reduxEffectsFetch2 = _interopRequireDefault(_reduxEffectsFetch);

var _normalize = require('middleware/normalize');

var _normalize2 = _interopRequireDefault(_normalize);

var _reduxEffectsLocation = require('redux-effects-location');

var _reduxEffectsLocation2 = _interopRequireDefault(_reduxEffectsLocation);

var _reduxEffectsCredentials = require('redux-effects-credentials');

var _reduxEffectsCookie = require('redux-effects-cookie');

var _reduxEffectsCookie2 = _interopRequireDefault(_reduxEffectsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Middleware
 */

/**
 * Imports
 */

function middleware(req) {
  var cookieObj = _cookie2.default.parse(req.headers.cookie || '');

  return [(0, _reduxEffectsCredentials.query)(_api.isApiServer, 'access_token', function (state) {
    return state.app.auth && state.app.auth.token;
  }), (0, _reduxEffectsLocation2.default)(req.url), (0, _reduxEffectsCookie2.default)(cookieObj), (0, _normalize2.default)(_api.isApiServer), _reduxEffectsFetch2.default, (0, _reduxFlo2.default)()
  // logger
  ];
}

function logger(api) {
  return function (next) {
    return function (action) {
      var result = next(action);
      var state = api.getState();
      console.log('action', action.type, state.app.url, state.app.ready, state.app.currentUser);

      return result;
    };
  };
}

/**
 * Exports
 */

exports.default = middleware;