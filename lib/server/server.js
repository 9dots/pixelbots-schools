'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replace = undefined;

require('babel-runtime/regenerator/runtime');

var _foreachObj = require('@f/foreach-obj');

var _foreachObj2 = _interopRequireDefault(_foreachObj);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Vars
 */

var main = _render2.default;

/**
 * Render
 */

/**
 * Imports
 */

function render(req, urls) {
  return main(req).then(function (params) {
    return (0, _page2.default)(params, urls);
  }, function (err) {
    return console.log('ERROR', err, err.stack);
  });
}

/**
 * Hot reloading
 */

function replace() {
  invalidate(new RegExp('^' + _path2.default.resolve('./src')));

  try {
    main = require('./server').default;
  } catch (e) {
    console.log('server replace error', e);
  }
}

function invalidate(re) {
  (0, _foreachObj2.default)(remove, require.cache);

  function remove(val, key) {
    if (re.test(key)) {
      delete require.cache[key];
    }
  }
}

/**
 * Exports
 */

exports.default = render;
exports.replace = replace;