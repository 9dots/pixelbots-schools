/**
 * Imports
 */

import {lookup, isEphemeral} from 'redux-ephemeral'
import {query} from 'redux-effects-credentials'
import location from 'redux-effects-location'
import normalize from 'middleware/normalize'
import events from 'redux-effects-events'
import cookie from 'redux-effects-cookie'
import fetch from 'redux-effects-fetch'
import scroll from 'middleware/scroll'
import logger from 'weo-redux-logger'
import {isApiServer} from 'lib/api'
import flo from 'redux-flo'

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
  logger({
    predicate: (getState, action) => action.type !== 'CREATE_EPHEMERAL' && action.type !== 'DESTROY_EPHEMERAL',
    stateTransformer: (state, action) => isEphemeral(action)
      ? lookup(state.ui, action.meta.ephemeral.key)
      : state
  })
]

/**
 * Exports
 */

export default middleware
