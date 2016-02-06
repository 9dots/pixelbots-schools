/**
 * Imports
 */

import css from 'jss-simple'
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
  mrg: {
    margin
  },
  pad: {
    padding
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
  col_sm: {
    width: 360
  },
  center: {
    textAlign: 'center'
  },
  link: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}

sides.forEach(side => {
  styles['mrg_' + side] = {['margin-' + side]: margin}
  styles['pad_' + side] = {['padding-' + side]: padding}
})

Object
  .keys(colors)
  .forEach(name => {
    styles[name] = {
      color: colors[name]
    }
  })

/**
 * Exports
 */

exports = module.exports = css(styles)
exports.mixins = mixins
exports.constants = constants
