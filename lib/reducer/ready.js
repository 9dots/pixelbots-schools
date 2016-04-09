'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _handleActions; /**
                     * Imports
                     */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appDidInitialize = exports.appIsInitializing = undefined;

var _createAction = require('@f/create-action');

var _createAction2 = _interopRequireDefault(_createAction);

var _handleActions2 = require('@f/handle-actions');

var _handleActions3 = _interopRequireDefault(_handleActions2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Actions
 */

var appIsInitializing = (0, _createAction2.default)('App is initializing');
var appDidInitialize = (0, _createAction2.default)('App did initialize');

/**
 * Ready-state reducer
 */

var reducer = (0, _handleActions3.default)((_handleActions = {}, (0, _defineProperty3.default)(_handleActions, appIsInitializing, function () {
  return false;
}), (0, _defineProperty3.default)(_handleActions, appDidInitialize, function () {
  return true;
}), _handleActions));

/**
 * Exports
 */

exports.default = reducer;
exports.appIsInitializing = appIsInitializing;
exports.appDidInitialize = appDidInitialize;