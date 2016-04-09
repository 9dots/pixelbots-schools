'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeApp = undefined;

var _ready = require('./ready');

var _ready2 = _interopRequireDefault(_ready);

var _currentUser = require('./currentUser');

var _currentUser2 = _interopRequireDefault(_currentUser);

var _combineReducers = require('@f/combine-reducers');

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _collections = require('./collections');

var _collections2 = _interopRequireDefault(_collections);

var _url = require('./url');

var _url2 = _interopRequireDefault(_url);

var _entities = require('./entities');

var _entities2 = _interopRequireDefault(_entities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [initializeApp].map(_regenerator2.default.mark); /**
                                                                * Imports
                                                                */

/**
 * Actions
 */

function initializeApp(ready) {
  return _regenerator2.default.wrap(function initializeApp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _url.watchUrl)();

        case 2:
          if (ready) {
            _context.next = 11;
            break;
          }

          _context.next = 5;
          return (0, _ready.appIsInitializing)();

        case 5:
          _context.next = 7;
          return (0, _auth.initializeAuth)();

        case 7:
          _context.next = 9;
          return (0, _currentUser.initializeUser)();

        case 9:
          _context.next = 11;
          return (0, _ready.appDidInitialize)();

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

/**
 * Reducer
 */

var reducer = (0, _combineReducers2.default)({
  app: (0, _combineReducers2.default)({
    ready: _ready2.default,
    url: _url2.default,
    auth: _auth2.default,
    currentUser: _currentUser2.default,
    entities: _entities2.default,
    collections: _collections2.default
  })
});

/**
 * Exports
 */

exports.default = reducer;
exports.initializeApp = initializeApp;