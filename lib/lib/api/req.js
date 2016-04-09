'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.del = exports.post = exports.put = exports.get = undefined;

var _config = require('lib/config');

var _http = require('lib/http');

var http = _interopRequireWildcard(_http);

var _xargs = require('@f/xargs');

var _xargs2 = _interopRequireDefault(_xargs);

var _map2 = require('@f/map');

var _map3 = _interopRequireDefault(_map2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * API Request Functions
 */

/**
 * Imports
 */

var _map = (0, _map3.default)(function (fn) {
  return (0, _xargs2.default)(fn, function (url) {
    return _config.apiServer + url;
  });
}, http);

var get = _map.get;
var put = _map.put;
var post = _map.post;
var del = _map.del;

/**
 * Exports
 */

exports.get = get;
exports.put = put;
exports.post = post;
exports.del = del;