/**
 * Imports
 */

import {get, put, post, del} from './req'
import qs from 'qs'

/**
 * API Regex (tests whether or not a url points at our api server)
 */

const regex = /\https?\:\/\/localhost\:1337\/.*/

function isApiServer (url) {
  return regex.test(url)
}

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
 * Exports
 */

export {
  user,
  isApiServer
}
