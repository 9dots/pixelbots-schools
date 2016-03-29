/**
 * Imports
 */

import flo from 'redux-flo'
import cookie from 'cookie'
import {isApiServer} from 'lib/api'
import fetch from 'redux-effects-fetch'
import normalize from 'middleware/normalize'
import location from 'redux-effects-location'
import {query} from 'redux-effects-credentials'
import cookieMiddleware from 'redux-effects-cookie'

/**
 * Middleware
 */

function middleware ({url, headers}) {
  const cookieObj = cookie.parse(headers.cookie) || ''

  return [
    query(isApiServer, 'access_token', state => state.auth && state.auth.token),
    location(url),
    cookieMiddleware(cookieObj),
    normalize(isApiServer),
    fetch,
    flo()
    // logger
  ]
}

function logger (api) {
  return next => action => {
    const result = next(action)
    const state = api.getState()
    console.log('action', action.type, state.url, state.ready, state.currentUser)

    return result
  }
}

/**
 * Exports
 */

export default middleware
