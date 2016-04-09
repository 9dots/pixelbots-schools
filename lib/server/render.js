'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _app = require('components/app');

var _app2 = _interopRequireDefault(_app);

var _string = require('vdux/string');

var _string2 = _interopRequireDefault(_string);

var _reducer = require('reducer/');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * initialState
 */

var initialState = {
  auth: {},
  user: {}
};

/**
 * Render to string
 */

/**
 * Imports
 */

function render(request) {
  return new _promise2.default(function (resolve, reject) {
    var _vdux = (0, _string2.default)({
      middleware: (0, _middleware2.default)(request),
      initialState: initialState,
      reducer: _reducer2.default
    });

    var subscribe = _vdux.subscribe;
    var render = _vdux.render;


    var stop = subscribe(function (state) {
      try {
        var html = render((0, _element2.default)(_app2.default, { state: state }));

        if (state.app.ready) {
          stop();
          resolve(html);
        }
      } catch (err) {
        reject(err);
        stop();
      }
    });
  });
}

/**
 * Exports
 */

exports.default = render;