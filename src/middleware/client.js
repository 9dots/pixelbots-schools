/**
 * Imports
 */

import location from 'redux-effects-location'
import cookie from 'redux-effects-cookie'
import fetch from 'redux-effects-fetch'
import effects from 'redux-effects'
import logger from 'redux-logger'
import multi from 'redux-multi'
import scroll from './scroll'

/**
 * Middleware
 */

const middleware = [
  multi,
  effects,
  cookie(),
  fetch,
  scroll,
  location(window),
  logger()
]

/**
 * Exports
 */

export default middleware
