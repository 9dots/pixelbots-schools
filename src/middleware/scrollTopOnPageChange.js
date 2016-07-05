/**
 * Imports
 */

import {urlDidUpdate} from 'reducer/url'

/**
 * Middleware
 */

function middleware () {
  return next => action => {
    return next(action)
  }
}

/**
 * Exports
 */

export default middleware
