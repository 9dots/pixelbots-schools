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
  },
  createTeacher (teacher) {
    return post('auth/user', teacher)
  },
  createStudent (student) {
    return post('auth/user', student)
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
  return url.indexOf(apiServer) === 0
}

/**
 * Exports
 */

export {
  user,
  isApiServer
}
