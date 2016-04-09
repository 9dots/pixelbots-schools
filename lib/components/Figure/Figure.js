'use strict';

var _vduxTransformHmr3 = require('vdux-transform-hmr');

var _vduxTransformHmr4 = _interopRequireDefault(_vduxTransformHmr3);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _resizeImage = require('lib/resize-image');

var _resizeImage2 = _interopRequireDefault(_resizeImage);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _jssSimple = require('jss-simple');

var _jssSimple2 = _interopRequireDefault(_jssSimple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _vduxTransformHmr2 = (0, _vduxTransformHmr4.default)({
  filename: 'src/components/Figure/Figure.js',
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
 * Figure
 */

function render(_ref) {
  var props = _ref.props;
  var url = props.url;
  var width = props.width;
  var height = props.height;
  var thumb = props.thumb;


  if (!url) return (0, _element2.default)('span', null);

  var ratio = props.ratio || height / width;
  var paddingBottom = ratio * 100 + '%';

  return (0, _element2.default)(
    'div',
    { 'class': container },
    (0, _element2.default)(
      'div',
      { style: { paddingBottom: paddingBottom } },
      (0, _element2.default)('img', { 'class': img, src: thumb ? (0, _resizeImage2.default)(url, 350) : url })
    )
  );
}

/**
 * Style
 */

var _css = (0, _jssSimple2.default)({
  img: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 'auto',
    display: 'block'
  },
  container: {
    overflow: 'hidden',
    position: 'relative',
    maxWidth: '100%',
    margin: 0
  }
}, __filename + '_1');

var container = _css.container;
var img = _css.img;

/**
 * Exports
 */

exports.default = _wrapComponent('_component')({
  render: render
});