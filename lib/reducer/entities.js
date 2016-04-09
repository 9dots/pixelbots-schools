'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _has = require('@f/has');

var _has2 = _interopRequireDefault(_has);

var _createAction = require('@f/create-action');

var _createAction2 = _interopRequireDefault(_createAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Entities reducer
 */

/**
 * Imports
 */

function reducer(state, action) {
  if (action.payload && (0, _has2.default)('entities', action.payload)) {
    return (0, _extends3.default)({}, state, action.payload.entities);
  }

  return state;
}

/**
 * Exports
 */

exports.default = reducer;