'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchUrl = undefined;

var _reduxEffectsLocation = require('redux-effects-location');

var _handleActions2 = require('@f/handle-actions');

var _handleActions3 = _interopRequireDefault(_handleActions2);

var _createAction = require('@f/create-action');

var _createAction2 = _interopRequireDefault(_createAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [watchUrl].map(_regenerator2.default.mark); /**
                                                           * Imports
                                                           */

/**
 * Actions
 */

var urlDidUpdate = (0, _createAction2.default)('URL did update');

function watchUrl() {
  return _regenerator2.default.wrap(function watchUrl$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _reduxEffectsLocation.bindUrl)(urlDidUpdate);

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

/**
 * Reducer
 */

var reducer = (0, _handleActions3.default)((0, _defineProperty3.default)({}, urlDidUpdate, function (state, url) {
  return url;
}));

/**
 * Exports
 */

exports.default = reducer;
exports.watchUrl = watchUrl;