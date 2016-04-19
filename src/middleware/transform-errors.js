/**
 * Imports
 */

import {FETCH} from 'redux-effects-fetch'

/**
 * Normalize API responses
 */

function transformErrorMiddleware (isMatch) {
  return api => next => action => isErrorableRequest(action, isMatch)
    ? next(action).then(null, transformError)
    : next(action)
}

/**
 * Transform error responses from our API server
 * into a format understood by the client
 */

function transformError (json) {
  if (json.status >= 400 && json.status < 500) {
    json.value.errors = Object
      .keys(json.value.errors)
      .map(field => ({field, message: json.value.errors[field].message}))
  }

  return Promise.reject(json)
}

/**
 * Check if an action is a GET request
 */

function isErrorableRequest (action, isMatch) {
  if (action.type === FETCH && isMatch(action.payload.url)) {
    const {params = {}} = action.payload
    const {method = 'GET'} = params

    return /^PUT|POST|DELETE$/i.test(method)
  }

  return false
}

/**
 * Exports
 */

export default transformErrorMiddleware
