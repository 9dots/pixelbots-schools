'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jssVendorPrefixer = require('jss-vendor-prefixer');

var _jssVendorPrefixer2 = _interopRequireDefault(_jssVendorPrefixer);

var _jssDefaultUnit = require('jss-default-unit');

var _jssDefaultUnit2 = _interopRequireDefault(_jssDefaultUnit);

var _jssCamelCase = require('jss-camel-case');

var _jssCamelCase2 = _interopRequireDefault(_jssCamelCase);

var _jssSimple = require('jss-simple');

var jss = _interopRequireWildcard(_jssSimple);

var _jssNested = require('jss-nested');

var _jssNested2 = _interopRequireDefault(_jssNested);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Setup jss
 */

jss.use((0, _jssCamelCase2.default)()).use((0, _jssNested2.default)()).use((0, _jssVendorPrefixer2.default)()).use((0, _jssDefaultUnit2.default)());

/**
 * Exports
 */

/**
 * Imports
 */

exports.default = jss;