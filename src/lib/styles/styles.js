/**
 * Imports
 */

import css from 'jss-simple'

/**
 * Styles
 */

const styles = {
  link: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  hover: {
    opacity: '0.9 !important',
    '&:hover': {
      opacity: '1 !important'
    }
  }
}

/**
 * Exports
 */

exports = module.exports = css(styles)
