'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userDidAuthenticate = exports.getAuthToken = exports.setAuthToken = exports.initializeAuth = undefined;

var _reduxEffectsCookie = require('redux-effects-cookie');

var _createAction = require('@f/create-action');

var _createAction2 = _interopRequireDefault(_createAction);

var _handleActions2 = require('@f/handle-actions');

var _handleActions3 = _interopRequireDefault(_handleActions2);

var _combineReducers = require('@f/combine-reducers');

var _combineReducers2 = _interopRequireDefault(_combineReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [initializeAuth, setAuthToken, getAuthToken].map(_regenerator2.default.mark); /**
                                                                                             * Imports
                                                                                             */

/**
 * Actions
 */

var userDidAuthenticate = (0, _createAction2.default)('User did authenticate');

function initializeAuth() {
  var token;
  return _regenerator2.default.wrap(function initializeAuth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getAuthToken();

        case 2:
          token = _context.sent;
          _context.next = 5;
          return userDidAuthenticate(token);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function setAuthToken(token) {
  return _regenerator2.default.wrap(function setAuthToken$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _reduxEffectsCookie.cookie)('authToken', token);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function getAuthToken() {
  var token;
  return _regenerator2.default.wrap(function getAuthToken$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _reduxEffectsCookie.cookie)('authToken');

        case 2:
          token = _context3.sent;
          return _context3.abrupt('return', token);

        case 4:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

/**
 * Reducer
 */

var reducer = (0, _combineReducers2.default)({
  token: (0, _handleActions3.default)((0, _defineProperty3.default)({}, userDidAuthenticate, function (state, token) {
    return token;
  }))
});

/**
 * Exports
 */

exports.default = reducer;
exports.initializeAuth = initializeAuth;
exports.setAuthToken = setAuthToken;
exports.getAuthToken = getAuthToken;
exports.userDidAuthenticate = userDidAuthenticate;