/**
 * Imports
 */

import * as http from 'lib/http'
import xargs from '@f/xargs'
import map from '@f/map'

/**
 * Constants
 */

const apiBase = 'http://localhost:1337/'

/**
 * API Request Functions
 */

const {get, put, post, del} = map(fn => xargs(fn, url => apiBase + url), http)

/**
 * Exports
 */

export {
  get,
  put,
  post,
  del
}
