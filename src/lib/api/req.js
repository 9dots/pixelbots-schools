/**
 * Imports
 */

import {apiServer} from 'lib/config'
import * as http from 'lib/http'
import xargs from '@f/xargs'
import map from '@f/map'

/**
 * API Request Functions
 */

const {get, put, post, del} = map(fn => xargs(fn, url => apiServer + url), http)

/**
 * Exports
 */

export {
  get,
  put,
  post,
  del
}
