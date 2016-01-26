/**
 * Imports
 */

import multi from 'redux-multi'
import effects from 'redux-effects'
import fetch from 'redux-effects-fetch'

/**
 * Middleware
 */

function middleware (req) {
  return [
    multi,
    fetch,
    effects
  ]
}

/**
 * Exports
 */

export default middleware
