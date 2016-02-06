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
  medium: {
    fontSize: '22px',
    lineHeight: '1.2em'
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
  mrg_side: {
    marginLeft: constants.spacing,
    marginRight: constants.spacing
  },
  mrg_side_small: {
    marginLeft: constants.spacing_small,
    marginRight: constants.spacing_small
  },
  mrg_vert: {
    marginTop: constants.spacing,
    marginBottom: constants.spacing
  },
  mrg_vert_small: {
    marginTop: constants.spacing_small,
    marginBottom: constants.spacing_small
  },
  pad: {
    padding
  },
  pad_side: {
    paddingLeft: constants.spacing,
    paddingRight: constants.spacing
  },
  pad_side_small: {
    paddingLeft: constants.spacing_small,
    paddingRight: constants.spacing_small
  },
  pad_vert: {
    paddingTop: constants.spacing,
    paddingBottom: constants.spacing
  },
  pad_vert_small: {
    paddingTop: constants.spacing_small,
    paddingBottom: constants.spacing_small
  },
  bold: {
    fontWeight: 'bold'
  },
  off_white: {
    color: '#f9f9f9'
  },
  white: {
    color: '#fff'
  },
  lighter: {
    fontWeight: 'lighter'
  },
  ln30: {
    lineHeight: '30px'
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
  }
}

forEach(side => styles['mrg_' + side] = {['margin-' + side]: side}, sides)
forEach(side => styles['pad_' + side] = {['padding-' + side]: side}, sides)
forEach((color, name) => styles[name] = {color}, colors)

/**
 * Exports
 */

exports = module.exports = css(styles)
exports.mixins = mixins
exports.constants = constants
