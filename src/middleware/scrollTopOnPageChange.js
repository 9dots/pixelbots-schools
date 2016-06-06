/**
 * Imports
 */

import {urlDidUpdate} from 'reducer/url'

/**
 * Middleware
 */

function middleware () {
  return next => action => {
    if (action.type === urlDidUpdate.type) {
      document.body.scrollTop = 0
    }

    return next(action)
  }
}

/**
 * Exports
 */

export default middleware
