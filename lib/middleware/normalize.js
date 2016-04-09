'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxEffectsFetch = require('redux-effects-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Normalize API responses
 */

function normalizeMiddleware(isMatch) {
  return function (api) {
    return function (next) {
      return function (action) {
        return isGetRequest(action, isMatch) ? next(action).then(normalize) : next(action);
      };
    };
  };
}

/**
 * Normalize an API response
 */

/**
 * Imports
 */

function normalize(res) {
  var value = res.value;


  if (value.kind === 'list') {
    return (0, _extends3.default)({}, res, {
      value: value.items.reduce(function (memo, item) {
        memo.result.push(item._id);
        memo.entities[item._id] = item;
        return memo;
      }, {
        result: [],
        entities: {},
        nextPageToken: value.nextPageToken
      })
    });
  }

  return (0, _extends3.default)({}, res, {
    value: {
      result: value._id,
      entities: (0, _defineProperty3.default)({}, value._id, value)
    }
  });
}

/**
 * Check if an action is a GET request
 */

function isGetRequest(action, isMatch) {
  if (action.type === _reduxEffectsFetch.FETCH && isMatch(action.payload.url)) {
    var _action$payload$param = action.payload.params;
    var params = _action$payload$param === undefined ? {} : _action$payload$param;
    var _params$method = params.method;
    var method = _params$method === undefined ? 'GET' : _params$method;


    return (/^GET$/i.test(method)
    );
  }

  return false;
}

/**
 * Exports
 */

exports.default = normalizeMiddleware;