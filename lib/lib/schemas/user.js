'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _schema = require('@weo-edu/schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * User schema
 */

var username = (0, _schema2.default)('string').min(3); /**
                                                        * Imports
                                                        */

var password = (0, _schema2.default)('string').min(6);

var email = (0, _schema2.default)('string').format('email', 'Invalid email address');

var name = (0, _schema2.default)().prop('givenName', 'string').prop('familyName', 'string').prop('honorificPrefix', 'string');

var user = (0, _schema2.default)().prop('username', username).prop('password', password).prop('name', name).prop('email', email).required(['password', 'name']);

/**
 * Exports
 */

exports.default = user;