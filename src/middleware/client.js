/**
 * Imports
 */

import {query} from 'redux-effects-credentials'
import location from 'redux-effects-location'
import events from 'redux-effects-events'
import cookie from 'redux-effects-cookie'
import fetch from 'redux-effects-fetch'
import normalize from './normalize'
import {isApiServer} from 'lib/api'
import logger from 'redux-logger'
import scroll from './scroll'
import flo from 'redux-flo'

/**
 * API Regex
 */

/**
 * Middleware
 */

const middleware = [
  flo(),
  cookie(),
  events(),
  query(isApiServer, 'access_token', state => state.auth && state.auth.token),
  normalize(isApiServer),
  fetch,
  scroll,
  location(),
  logger()
]

/**
 * Exports
 */

export default middleware
