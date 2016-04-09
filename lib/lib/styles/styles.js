'use strict';

var _jssSimple = require('jss-simple');

var _jssSimple2 = _interopRequireDefault(_jssSimple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Styles
 */

var styles = {
  link: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  hover: {
    opacity: '0.9 !important',
    '&:hover': {
      opacity: '1 !important'
    }
  }
};

/**
 * Exports
 */

/**
 * Imports
 */

exports = module.exports = (0, _jssSimple2.default)(styles, __filename + '_1');