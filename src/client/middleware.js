/**
 * Imports
 */

import fetch, {fetchEncodeJSON} from 'redux-effects-fetch'
import transformErrors from 'middleware/transform-errors'
import {shouldLog, setLogLevel} from 'lib/log-level'
import {lookup, isEphemeral} from 'redux-ephemeral'
import {query} from 'redux-effects-credentials'
import location from 'redux-effects-location'
import normalize from 'middleware/normalize'
import events from 'redux-effects-events'
import cookie from 'redux-effects-cookie'
import media from 'redux-effects-media'
import upload from 'middleware/upload'
import scroll from 'middleware/scroll'
import * as summon from 'vdux-summon'
import logger from 'weo-redux-logger'
import OAuth from 'middleware/oauth'
import print from 'middleware/print'
import modal from 'middleware/modal'
import title from 'middleware/title'
import {isApiServer} from 'lib/api'
import flo from 'redux-flo'

/**
 * Middleware
 */

const middleware = [
  flo(),
  cookie(),
  events(),
  query(isApiServer, 'access_token', state => state.app.auth && state.app.auth.token),
  transformErrors(isApiServer),
  // normalize(isApiServer),
  fetchEncodeJSON,
  fetch,
  media,
  scroll,
  upload,
  location(),
  modal,
  title(),
  summon.middleware('app.summon'),
  OAuth,
  print,
  logger({
    predicate: (getState, action) => shouldLog((action.meta && action.meta.logLevel) || 'info'),
    stateTransformer: (state, action) => isEphemeral(action)
      ? lookup(state.ui, action.meta.ephemeral.key)
      : state
  })
]

/**
 * Expose setLogLevel so it can be called
 * from the console
 */

window.setLogLevel = setLogLevel

/**
 * Exports
 */

export default middleware
