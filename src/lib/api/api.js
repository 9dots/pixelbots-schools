/**
 * Imports
 */

import {get, put, post, del} from './req'
import {apiServer} from 'lib/config'
import qs from 'qs'

/**
 * API Wrappers
 */

const user = {
  login (credentials) {
    return post('auth/login', credentials)
  },
  getCurrentUser () {
    return get('user/')
  },
  getHomeFeed (opts = {maxResults: 16}) {
    return get('share/feed?' + qs.stringify(opts))
  }
}

/**
 * Test whether or not a URL points to our API server
 * Useful for adding credentials and such
 */

function isApiServer (url) {
  return url.indexOf(apiServer) === 0
}

/**
 * Exports
 */

export {
  user,
  isApiServer
}
