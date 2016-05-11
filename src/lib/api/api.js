/**
 * Imports
 */

import {get, put, post, del} from './req'
import qs from 'qs'

/**
 * API Wrappers
 */

const user = {
  getCurrentUser () {
    return get('user/')
  },
  oauthCreate (provider, data) {
    return post('auth/' + provider, data)
  },
  oauthLogin (provider, data) {
    return put('auth/login/' + provider, data)
  }
}

/**
 * Test whether or not a URL points to our API server
 * Useful for adding credentials and such
 */

function isApiServer (url) {
  return url.indexOf(process.env.API_SERVER) === 0
}

/**
 * Exports
 */

export {
  user,
  isApiServer
}
