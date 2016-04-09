'use strict';

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TeacherSignup = require('pages/TeacherSignup');

var _TeacherSignup2 = _interopRequireDefault(_TeacherSignup);

var _StudentSignup = require('pages/StudentSignup');

var _StudentSignup2 = _interopRequireDefault(_StudentSignup);

var _MyActivities = require('pages/MyActivities');

var _MyActivities2 = _interopRequireDefault(_MyActivities);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _Login = require('pages/Login');

var _Login2 = _interopRequireDefault(_Login);

var _Feed = require('pages/Feed');

var _Feed2 = _interopRequireDefault(_Feed);

var _Home = require('pages/Home');

var _Home2 = _interopRequireDefault(_Home);

var _enroute = require('enroute');

var _enroute2 = _interopRequireDefault(_enroute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/components/Router/Router.js',
  components: _components,
  locals: [],
  imports: []
});

function _wrapComponent(id) {
  return function (Component) {
    return _vduxTransformHmr2(Component, id);
  };
} /**
   * Imports
   */

/**
 * Enroute
 */

var router = (0, _enroute2.default)({
  '/': function _(params, props) {
    return isLoggedIn(props) ? (0, _element2.default)(_Feed2.default, props) : (0, _element2.default)(_Home2.default, props);
  },
  '/login': function login(params, props) {
    return (0, _element2.default)(_Login2.default, props);
  },
  '/activities/all': function activitiesAll(params, props) {
    return (0, _element2.default)(_MyActivities2.default, props);
  },
  '/teacher': function teacher(params, props) {
    return (0, _element2.default)(_TeacherSignup2.default, props);
  },
  '/student': function student(params, props) {
    return (0, _element2.default)(_StudentSignup2.default, props);
  },
  '*': function _(params, props) {
    return (0, _element2.default)(
      'div',
      null,
      '404: Page not found'
    );
  }
});

/**
 * Router
 */

function render(_ref) {
  var props = _ref.props;

  if (!props.url) return (0, _element2.default)(
    'div',
    null,
    'Loading...'
  );
  return router(props.url, props);
}

/**
 * Helpers
 */

function isLoggedIn(state) {
  return !!state.currentUser;
}

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});