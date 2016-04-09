'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.explore = exports.following = undefined;

var _combineReducers = require('@f/combine-reducers');

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _createAction = require('@f/create-action');

var _createAction2 = _interopRequireDefault(_createAction);

var _collection = require('lib/collection');

var _collection2 = _interopRequireDefault(_collection);

var _api = require('lib/api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Collections
 */

/**
 * Imports
 */

var following = (0, _collection2.default)('following', _api.user.getHomeFeed);
var explore = (0, _collection2.default)('explore', _api.user.getExploreFeed);

/**
 * Collection reducer
 */

var reducer = (0, _combineReducers2.default)({
  following: following,
  explore: explore
});

/**
 * Exports
 */

exports.default = reducer;
exports.following = following;
exports.explore = explore;