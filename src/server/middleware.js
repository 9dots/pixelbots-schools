/**
 * Imports
 */

import fetch, {fetchEncodeJSON} from 'redux-effects-fetch'
import cookieMiddleware from 'redux-effects-cookie'
import location from 'redux-effects-location'
import title from 'middleware/title'
import flox from '@flox/fork'
import flo from 'redux-flo'
import cookie from 'cookie'

/**
 * Middleware
 */

function middleware ({url, headers}, setTitle) {
  const cookieObj = cookie.parse(headers.cookie || '')

  return [
    flo(),
    flox,
    // logger,
    location(url),
    cookieMiddleware(cookieObj),
    // normalize(isApiServer),
    fetchEncodeJSON,
    title(setTitle),
    fetch
  ]
}

function logger (api) {
  return next => action => {
    const result = next(action)
    const state = api.getState()
    console.log('action', action.type, action.payload)

    return result
  }
}

/**
 * Exports
 */

export default middleware
