'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollTo = undefined;

var _animate = require('@f/animate');

var _animate2 = _interopRequireDefault(_animate);

var _createAction = require('@f/create-action');

var _createAction2 = _interopRequireDefault(_createAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Action types
 */

/**
 * Imports
 */

var SCROLL_TO = 'SCROLL_TO';

/**
 * Scroll middleware
 */

function middleware() {
  return function (next) {
    return function (action) {
      return action.type === SCROLL_TO ? scrollToElement(action.payload) : next(action);
    };
  };
}

/**
 * Helpers
 */

function scrollToElement(_ref) {
  var element = _ref.element;
  var duration = _ref.duration;
  var easing = _ref.easing;

  element = asElement(element);

  var _element$getBoundingC = element.getBoundingClientRect();

  var left = _element$getBoundingC.left;
  var top = _element$getBoundingC.top;

  var start = {
    left: window.pageXOffset,
    top: window.pageYOffset
  };

  var end = {
    left: start.left + left,
    top: start.top + top
  };

  (0, _animate2.default)(start, end, function (props) {
    window.scrollTo(props.left, props.top);
  }, duration, easing);
}

function asElement(element) {
  return 'string' === typeof element ? document.querySelector(element) : element;
}

/**
 * Action creators
 */

var scrollTo = (0, _createAction2.default)(SCROLL_TO, function (element, opts) {
  return (0, _extends3.default)({
    element: element
  }, opts);
});

/**
 * Exports
 */

exports.default = middleware;
exports.scrollTo = scrollTo;