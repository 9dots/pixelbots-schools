'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.put = exports.del = exports.get = exports.post = undefined;

var _reduxEffectsFetch = require('redux-effects-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wrappers
 */

function post(url, body) {
  var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var headers = opts.headers || {};

  return (0, _reduxEffectsFetch.fetch)(url, (0, _extends3.default)({}, opts, {
    method: 'post',
    headers: (0, _extends3.default)({}, headers, {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    body: (0, _stringify2.default)(body)
  }));
} /**
   * Imports
   */

function get(url, opts) {
  return (0, _reduxEffectsFetch.fetch)(url, opts);
}

function del(url, opts) {
  return (0, _reduxEffectsFetch.fetch)(url, (0, _extends3.default)({}, opts, {
    method: 'delete'
  }));
}

function put(url, body) {
  var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var headers = opts.headers || {};

  return (0, _reduxEffectsFetch.fetch)(url, (0, _extends3.default)({}, opts, {
    method: 'put',
    headers: (0, _extends3.default)({}, headers, {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    body: (0, _stringify2.default)(body)
  }));
}

/**
 * Exports
 */

exports.post = post;
exports.get = get;
exports.del = del;
exports.put = put;