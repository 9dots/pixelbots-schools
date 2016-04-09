'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vduxUi = require('vdux-ui');

var _vduxContainers = require('vdux-containers');

var _currentUser = require('reducer/currentUser');

var _ClassNav = require('components/ClassNav');

var _ClassNav2 = _interopRequireDefault(_ClassNav);

var _HomeOwl = require('components/HomeOwl');

var _HomeOwl2 = _interopRequireDefault(_HomeOwl);

var _Avatar = require('components/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _vduxDropdown = require('vdux-dropdown');

var _vduxDropdown2 = _interopRequireDefault(_vduxDropdown);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _jssSimple = require('jss-simple');

var _jssSimple2 = _interopRequireDefault(_jssSimple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/layouts/App/Nav.js',
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
 * Main nav
 */

function render(_ref) {
  var props = _ref.props;
  var currentUser = props.currentUser;
  var url = props.url;

  var Item = navItem(url);

  return (0, _element2.default)(
    _vduxUi.Block,
    null,
    (0, _element2.default)(
      _vduxUi.Fixed,
      { wide: true, top: true, z: 2 },
      (0, _element2.default)(
        _vduxUi.Flex,
        { align: 'space-between', wide: true, bgColor: 'grey', color: 'white' },
        (0, _element2.default)(
          _vduxUi.Flex,
          { align: 'start center' },
          (0, _element2.default)(
            _vduxUi.Flex,
            { align: 'center center', mx: 'm' },
            (0, _element2.default)(_HomeOwl2.default, null)
          ),
          (0, _element2.default)(Item, { href: '/', icon: 'home', text: 'Home' }),
          (0, _element2.default)(Item, { href: '/activities/all', icon: 'assignment', text: 'My Activities' }),
          (0, _element2.default)(
            _ClassNav2.default,
            { classes: currentUser.groups },
            (0, _element2.default)(
              Item,
              { ml: 's', fs: 's', icon: 'school', text: 'Classes' },
              (0, _element2.default)(_vduxUi.Icon, { name: 'arrow_drop_down' })
            )
          )
        ),
        (0, _element2.default)(
          _vduxUi.Menu,
          { spacing: 'm', flex: true, align: 'end center' },
          (0, _element2.default)(
            _vduxContainers.Button,
            { onClick: _currentUser.logoutUser },
            'Logout'
          ),
          (0, _element2.default)(_vduxContainers.Button, { fs: 'm', tooltip: 'Search Weo', ttPlacement: 'bottom', icon: 'search' }),
          (0, _element2.default)(_vduxContainers.Button, { fs: 'm', tooltip: 'Notifications', ttPlacement: 'bottom', icon: 'notifications' }),
          (0, _element2.default)(
            _vduxDropdown2.default,
            { w: '180px', btn: (0, _element2.default)(_Avatar2.default, { actor: currentUser }) },
            (0, _element2.default)(
              _vduxContainers.MenuItem,
              { px: 'm', py: 's' },
              (0, _element2.default)(_vduxUi.Icon, { name: 'person' }),
              'My Profile'
            ),
            (0, _element2.default)(
              'div',
              null,
              'My Drafts'
            ),
            (0, _element2.default)(_vduxUi.Divider, null),
            (0, _element2.default)(
              'div',
              null,
              'Connect'
            ),
            (0, _element2.default)(
              'div',
              null,
              'Notifications'
            ),
            (0, _element2.default)(_vduxUi.Divider, null),
            (0, _element2.default)(
              'div',
              null,
              'Settings'
            ),
            (0, _element2.default)(
              'div',
              null,
              'Help Center'
            ),
            (0, _element2.default)(
              'div',
              null,
              'Log Out'
            )
          ),
          (0, _element2.default)(
            _vduxContainers.Button,
            { pill: true, h: 34 },
            (0, _element2.default)(
              _vduxUi.Flex,
              { align: 'center center' },
              (0, _element2.default)(_vduxUi.Icon, { fs: 's', mr: 's', name: 'edit' }),
              'Create Activity'
            )
          )
        )
      )
    ),
    (0, _element2.default)(_vduxUi.Block, { pt: 53, hidden: true })
  );
}

function navItem(url) {
  return function (_ref2) {
    var props = _ref2.props;
    var children = _ref2.children;
    var text = props.text;
    var icon = props.icon;
    var href = props.href;
    var onClick = props.onClick;


    return (0, _element2.default)(
      _vduxUi.Flex,
      {
        tag: href ? 'a' : 'div',
        onClick: onClick,
        href: href,
        align: 'center center',
        h: 53,
        pointer: true,
        px: 9,
        mr: 9,
        transition: 'all 0.15s',
        'class': [item, (0, _defineProperty3.default)({}, active, url === href)] },
      (0, _element2.default)(_vduxUi.Icon, { fs: 'm', name: icon }),
      (0, _element2.default)(
        _vduxUi.Text,
        { ml: 's' },
        text
      ),
      children
    );
  };
}

/**
 * Style
 */

var activeStyle = {
  borderBottom: '3px solid #fff'
};

var _css = (0, _jssSimple2.default)({
  item: {
    borderBottom: '3px solid transparent',
    '&:hover': activeStyle
  },
  active: activeStyle
}, __filename + '_1');

var item = _css.item;
var active = _css.active;

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});