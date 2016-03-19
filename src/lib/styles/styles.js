/**
 * Imports
 */

import css from 'jss-simple'
import forEach from '@f/foreach'
import * as fontSizes from './font-sizes'
import * as colors from 'lib/colors'
import capitalize from '@f/capitalize'
import * as mixins from './mixins'
import * as constants from './constants'

/**
 * Constants
 */

const {margin, padding, sides} = constants

/**
 * Styles
 */

const styles = {
  tall: {
    height: '100%'
  },
  wide: {
    width: '100%'
  },
  ln30: {
    lineHeight: '30px'
  },
  ln20: {
    lineHeight: '20px'
  },
  ln1: {
    lineHeight: 1
  },
  mrg: {
    margin
  },
  mrg_left_small: {
    marginLeft: constants.spacingSmall
  },
  mrg_right_small: {
    marginRight: constants.spacingSmall
  },
  mrg_side: {
    marginLeft: constants.spacing,
    marginRight: constants.spacing
  },
  mrg_side_small: {
    marginLeft: constants.spacingSmall,
    marginRight: constants.spacingSmall
  },
  mrg_vert: {
    marginTop: constants.spacing,
    marginBottom: constants.spacing
  },
  mrg_vert_small: {
    marginTop: constants.spacingSmall,
    marginBottom: constants.spacingSmall
  },
  pad: {
    padding
  },
  pad_side: {
    paddingLeft: constants.spacing,
    paddingRight: constants.spacing
  },
  pad_side_small: {
    paddingLeft: constants.spacingSmall,
    paddingRight: constants.spacingSmall
  },
  pad_vert: {
    paddingTop: constants.spacing,
    paddingBottom: constants.spacing
  },
  pad_vert_small: {
    paddingTop: constants.spacingSmall,
    paddingBottom: constants.spacingSmall
  },
  off_white: {
    color: '#f9f9f9'
  },
  white: {
    color: '#fff'
  },
  col_xsm: {
    width: 200
  },
  col_sm: {
    width: 360
  },
  col_med: {
    width: 440
  },
  col_lrg: {
    width: 520
  },
  col_main: {
    width: 968,
    margin: '0 auto'
  },
  left: {
    textAlign: 'left'
  },
  center: {
    textAlign: 'center'
  },
  right: {
    textAlign: 'right'
  },
  link: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  uppercase: {
    textTransform: 'uppercase'
  },
  underline: {
    textTransform: 'underline'
  },
  xx_large: {
    fontSize: fontSizes.xxl,
    lineHeight: '1.2em'
  },
  x_large: {
    fontSize: fontSizes.xl,
    lineHeight: '1.2em'
  },
  large: {
    fontSize: fontSizes.l,
    lineHeight: '1.2em'
  },
  medium: {
    fontSize: fontSizes.m,
    lineHeight: '1.2em'
  },
  small: {
    fontSize: fontSizes.s,
    lineHeight: '1.4em'
  },
  x_small: {
    fontSize: fontSizes.xs,
    lineHeight: '1.2em'
  },
  xx_small: {
    fontSize: fontSizes.xxs,
    lineHeight: '1.2em'
  },
  mono: {
    fontFamily: 'monospace'
  },
  bold: {
    fontWeight: 'bold'
  },
  bolder: {
    fontWeight: 'bolder'
  },
  lighter: {
    fontWeight: 'lighter'
  },
  italic: {
    fontWeight: 'italic'
  },
  hidden: {
    display: 'none'
  },
  invisible: {
    visibility: 'hidden',
    pointerEvents: 'none'
  },
  alignCenter: {
    display: 'block',
    margin: '0 auto'
  },
  relative: {
    position: 'relative'
  },
  anchor: {
    padding: '13px',
    display: 'inline-block',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: '400',
    lineHeight: '1em',
    color: '#fff',
    '-webkit-font-smoothing': 'antialiased',
    transition: 'color 0.1s 0s ease-in-out'
  },
  input: {
    ...mixins.textInput()
  },
  ellipsis: {
    ...mixins.ellipsis()
  }
}

forEach(side => styles['mrg_' + side] = {['margin-' + side]: constants.spacing}, sides)
forEach(side => styles['pad_' + side] = {['padding-' + side]: constants.spacing}, sides)
forEach((color, name) => styles[name] = {color}, colors)

/**
 * Exports
 */

exports = module.exports = css(styles)
exports.mixins = mixins
exports.constants = constants
exports.fontSizes = fontSizes
