/**
 * Imports
 */

import fetch, {fetchEncodeJSON} from 'redux-effects-fetch'
import cookieMiddleware from 'redux-effects-cookie'
import {query} from 'redux-effects-credentials'
import location from 'redux-effects-location'
import normalize from 'middleware/normalize'
import title from 'middleware/title'
import {isApiServer} from 'lib/api'
import flo from 'redux-flo'
import cookie from 'cookie'

/**
 * Middleware
 */

function middleware ({url, headers}, setTitle) {
  const cookieObj = cookie.parse(headers.cookie || '')

  return [
    // logger,
    query(isApiServer, 'access_token', state => state.app.auth && state.app.auth.token),
    location(url),
    cookieMiddleware(cookieObj),
    // normalize(isApiServer),
    fetchEncodeJSON,
    title(setTitle),
    fetch,
    flo()
  ]
}

function logger (api) {
  return next => action => {
    const result = next(action)
    const state = api.getState()
    console.log('action', action.type, state.app.url, state.app.ready, state.app.currentUser)

    return result
  }
}

/**
 * Exports
 */

export default middleware
