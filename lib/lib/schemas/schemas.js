'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _teacher = require('./teacher');

var _teacher2 = _interopRequireDefault(_teacher);

var _student = require('./student');

var _student2 = _interopRequireDefault(_student);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Schemas
 */

var schemas = {
  user: _user2.default,
  student: _student2.default,
  teacher: _teacher2.default
};

/**
 * Exports
 */

/**
 * Imports
 */

exports.default = schemas;