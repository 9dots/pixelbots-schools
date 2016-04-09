'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _handleActions;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutUser = exports.userDidLogout = exports.userLoginFailed = exports.userDidLogin = exports.userDidLoad = exports.loginUser = exports.initializeUser = undefined;

var _handleActions2 = require('@f/handle-actions');

var _handleActions3 = _interopRequireDefault(_handleActions2);

var _reduxEffectsLocation = require('redux-effects-location');

var _createAction = require('@f/create-action');

var _createAction2 = _interopRequireDefault(_createAction);

var _auth = require('./auth');

var _api = require('lib/api');

var _noop = require('@f/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [initializeUser, loginUser, logoutUser].map(_regenerator2.default.mark); /**
                                                                                        * Imports
                                                                                        */

/**
 * Actions
 */

var userDidLoad = (0, _createAction2.default)('User did load');
var userDidLogin = (0, _createAction2.default)('User did login');
var userLoginFailed = (0, _createAction2.default)('User login failed');
var userDidLogout = (0, _createAction2.default)('User did logout');

function initializeUser() {
  var res;
  return _regenerator2.default.wrap(function initializeUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _api.user.getCurrentUser();

        case 3:
          res = _context.sent;
          _context.next = 6;
          return userDidLoad(res.value);

        case 6:
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context['catch'](0);
          _context.next = 12;
          return userDidLoad(null);

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[0, 8]]);
}

function loginUser(credentials) {
  var cb = arguments.length <= 1 || arguments[1] === undefined ? _noop2.default : arguments[1];

  var _res;

  return _regenerator2.default.wrap(function loginUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _api.user.login(credentials);

        case 3:
          _res = _context2.sent;
          _context2.next = 6;
          return (0, _auth.setAuthToken)(_res.value.token);

        case 6:
          _context2.next = 8;
          return (0, _auth.userDidAuthenticate)(_res.value.token);

        case 8:
          _context2.next = 10;
          return userDidLogin(_res.value);

        case 10:
          _context2.next = 12;
          return userDidLoad(_res.value);

        case 12:
          _context2.next = 14;
          return cb(_res.value);

        case 14:
          _context2.next = 16;
          return (0, _reduxEffectsLocation.setUrl)('/');

        case 16:
          _context2.next = 24;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 22;
          return userLoginFailed(_context2.t0.value);

        case 22:
          _context2.next = 24;
          return cb(null, _context2.t0.value);

        case 24:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this, [[0, 18]]);
}

function logoutUser() {
  return _regenerator2.default.wrap(function logoutUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _auth.setAuthToken)('');

        case 2:
          _context3.next = 4;
          return userDidLogout();

        case 4:
          _context3.next = 6;
          return (0, _reduxEffectsLocation.setUrl)('/');

        case 6:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}

/**
 * Reducer
 */

var reducer = (0, _handleActions3.default)((_handleActions = {}, (0, _defineProperty3.default)(_handleActions, userDidLoad, function (state, user) {
  return user;
}), (0, _defineProperty3.default)(_handleActions, userDidLogout, function (state, user) {
  return null;
}), _handleActions));

/**
 * Exports
 */

exports.default = reducer;
exports.initializeUser = initializeUser;
exports.loginUser = loginUser;
exports.userDidLoad = userDidLoad;
exports.userDidLogin = userDidLogin;
exports.userLoginFailed = userLoginFailed;
exports.userDidLogout = userDidLogout;
exports.logoutUser = logoutUser;