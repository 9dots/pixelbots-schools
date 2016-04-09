'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Style constants
 */

var margin = '12px';
var padding = '12px';
var sides = ['top', 'left', 'bottom', 'right'];
var cardRadius = 0;
var tileWidth = 230;
var spacing = 12;
var navHeight = 53;
var defaultColor = '#54738E';
var spacingSmall = spacing / 2;
var docMarg = spacing * 2;
var metaHeight = 225;
var navBtnHeight = 34;

var cardShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.2)';
var shadow = {
  card: cardShadow,
  z1: cardShadow,
  z2: '0 1px 4px 0 rgba(0, 0, 0, 0.25)',
  z3: '0 1px 7px 0 rgba(0, 0, 0, 0.3)'
};

var media = {
  pc: '(min-width: 1201px)',
  phone: '(max-width: 600px)',
  tablet: '(min-width: 601px) and (max-width: 960px)',
  tabletLandscape: '(min-width: 961px) and (max-width: 1200px)',
  webkit: 'screen and (-webkit-min-device-pixel-ratio:0)'
};

var icon = {
  small: '25px',
  default: '32px',
  medium: '40px',
  large: '100px'
};

/**
 * Exports
 */

exports.margin = margin;
exports.padding = padding;
exports.sides = sides;
exports.cardRadius = cardRadius;
exports.tileWidth = tileWidth;
exports.spacing = spacing;
exports.navHeight = navHeight;
exports.navBtnHeight = navBtnHeight;
exports.defaultColor = defaultColor;
exports.spacing = spacing;
exports.spacingSmall = spacingSmall;
exports.docMarg = docMarg;
exports.metaHeight = metaHeight;
exports.shadow = shadow;
exports.media = media;
exports.icon = icon;