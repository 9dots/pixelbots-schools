/**
 * Style constants
 */

const margin = '12px'
const padding = '12px'
const sides = ['top', 'left', 'bottom', 'right']
const cardRadius = 0
const tileWidth = 230
const spacing = 12
const navHeight = 53
const defaultColor = '#54738E'
const spacingSmall = spacing / 2
const docMarg = spacing * 2
const metaHeight = 225
const navBtnHeight = 34

const cardShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.2)'
const shadow = {
  card: cardShadow,
  z1: cardShadow,
  z2: '0 1px 4px 0 rgba(0, 0, 0, 0.25)',
  z3: '0 1px 7px 0 rgba(0, 0, 0, 0.3)'
}

const media = {
  pc: '(min-width: 1201px)',
  phone: '(max-width: 600px)',
  tablet: '(min-width: 601px) and (max-width: 960px)',
  tabletLandscape: '(min-width: 961px) and (max-width: 1200px)',
  webkit: 'screen and (-webkit-min-device-pixel-ratio:0)'
}

const icon = {
  small: '25px',
  default: '32px',
  medium: '40px',
  large: '100px'
}

/**
 * Exports
 */

export {
  margin,
  padding,
  sides,
  cardRadius,
  tileWidth,
  spacing,
  navHeight,
  navBtnHeight,
  defaultColor,
  spacing,
  spacingSmall,
  docMarg,
  metaHeight,

  shadow,
  media,
  icon
}
