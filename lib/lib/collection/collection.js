'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handleActions2 = require('@f/handle-actions');

var _handleActions3 = _interopRequireDefault(_handleActions2);

var _createAction = require('@f/create-action');

var _createAction2 = _interopRequireDefault(_createAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Collection
 */

/**
 * Imports
 */

function collection(name, get) {
  var _handleActions;

  var request = (0, _createAction2.default)('requesting collection: ' + name);
  var success = (0, _createAction2.default)('request collection success: ' + name);
  var failure = (0, _createAction2.default)('request collection failure: ' + name);
  var destroy = (0, _createAction2.default)('destroy collection: ' + name);

  var reducer = (0, _handleActions3.default)((_handleActions = {}, (0, _defineProperty3.default)(_handleActions, request, function (state) {
    return (0, _extends3.default)({}, state, {
      loading: true
    });
  }), (0, _defineProperty3.default)(_handleActions, success, function (state, _ref) {
    var _ref$result = _ref.result;
    var result = _ref$result === undefined ? [] : _ref$result;
    var nextPageToken = _ref.nextPageToken;
    return (0, _extends3.default)({}, state, {
      loading: false,
      ids: [].concat((0, _toConsumableArray3.default)(state.ids || []), (0, _toConsumableArray3.default)(result)),
      nextPageToken: nextPageToken
    });
  }), (0, _defineProperty3.default)(_handleActions, failure, function (state, error) {
    return (0, _extends3.default)({}, state, {
      loading: false,
      error: error
    });
  }), (0, _defineProperty3.default)(_handleActions, destroy, function (state) {
    return {};
  }), _handleActions), {
    loading: false,
    error: null,
    ids: [],
    nextPageToken: null
  });

  reducer.request = request;
  reducer.success = success;
  reducer.failure = failure;
  reducer.destroy = destroy;

  reducer.fetch = _regenerator2.default.mark(function fetch(opts) {
    var res, _res;

    return _regenerator2.default.wrap(function fetch$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return reducer.request();

          case 2:
            res = _context.sent;
            _context.prev = 3;
            _context.next = 6;
            return get(opts);

          case 6:
            _res = _context.sent;
            _context.next = 9;
            return reducer.success(_res.value);

          case 9:
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](3);
            _context.next = 15;
            return reducer.failure(_context.t0);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, fetch, this, [[3, 11]]);
  });

  return reducer;
}

/**
 * Exports
 */

exports.default = collection;