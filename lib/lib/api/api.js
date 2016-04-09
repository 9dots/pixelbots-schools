'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isApiServer = exports.user = undefined;

var _req = require('./req');

var _config = require('lib/config');

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * API Wrappers
 */

var user = {
  login: function login(credentials) {
    return (0, _req.post)('auth/login', credentials);
  },
  getCurrentUser: function getCurrentUser() {
    return (0, _req.get)('user/');
  },
  getHomeFeed: function getHomeFeed() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? { maxResults: 16 } : arguments[0];

    return (0, _req.get)('share/feed?' + _qs2.default.stringify(opts));
  }
};

/**
 * Test whether or not a URL points to our API server
 * Useful for adding credentials and such
 */

/**
 * Imports
 */

function isApiServer(url) {
  return url.indexOf(_config.apiServer) === 0;
}

/**
 * Exports
 */

exports.user = user;
exports.isApiServer = isApiServer;