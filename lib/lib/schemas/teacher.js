'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _schema = require('@weo-edu/schema');

var _schema2 = _interopRequireDefault(_schema);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Teacher schema
 */

/**
 * Imports
 */

var teacher = _user2.default.required('email');

/**
 * Exports
 */

exports.default = teacher;