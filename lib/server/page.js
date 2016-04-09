'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constants
 */

/**
 * Imports
 */

var globalStyle = _fs2.default.readFileSync(_path2.default.join(__dirname, 'global.css'));

/**
 * Render a page
 */

function page(_ref, urls) {
  var html = _ref.html;
  var state = _ref.state;

  return '\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <base href=\'/\' />\n        <meta name=\'google\' content=\'notranslate\' />\n\n        <title>Weo</title>\n        <style>\n          ' + globalStyle + '\n        </style>\n        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />\n        <script type=\'text/javascript\' src=\'' + urls.js + '\'></script>\n        <script type=\'text/javascript\'>\n          window.__initialState__ = ' + (0, _stringify2.default)(state) + '\n        </script>\n      </head>\n      <body>' + html + '</body>\n    </html>\n  ';
}

/**
 * Exports
 */

exports.default = page;