/**
 * Imports
 */

import {FETCH} from 'redux-effects-fetch'

/**
 * Normalize API responses
 */

function normalizeMiddleware (isMatch) {
  return api => next => action => isGetRequest(action, isMatch)
    ? next(action).then(normalize)
    : next(action)
}

/**
 * Normalize an API response
 */

function normalize (res) {
  const {value} = res

  if (value.kind === 'list') {
    return {
      ...res,
      value: value.items
        .reduce((memo, item) => {
          memo.result.push(item._id)
          memo.entities[item._id] = item
          return memo
        }, {
          result: [],
          entities: {},
          nextPageToken: value.nextPageToken
        })
    }
  }

  return {
    ...res,
    value: {
      result: value._id,
      entities: {
        [value._id]: value
      }
    }
  }
}

/**
 * Check if an action is a GET request
 */

function isGetRequest (action, isMatch) {
  if (action.type === FETCH && isMatch(action.payload.url)) {
    const {params = {}} = action.payload
    const {method = 'GET'} = params

    return /^GET$/i.test(method)
  }

  return false
}

/**
 * Exports
 */

export default normalizeMiddleware
