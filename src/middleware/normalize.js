/**
 * Imports
 */

import {FETCH} from 'redux-effects-fetch'

/**
 * Normalize API responses
 */

function normalizeMiddleware (isMatch) {
  return api => next => action => isApiRequest(action, isMatch)
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
  } else if (value.hasOwnProperty('_id')) {
    return {
      ...res,
      value: {
        result: value._id,
        entities: {
          [value._id]: value
        }
      }
    }
  } else {
    return res
  }
}

/**
 * Check if an action is an API request
 */

function isApiRequest (action, isMatch) {
  return action.type === FETCH && isMatch(action.payload.url)
}

/**
 * Exports
 */

export default normalizeMiddleware
