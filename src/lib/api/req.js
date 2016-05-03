/**
 * Imports
 */

import * as http from 'lib/http'
import xargs from '@f/xargs'
import map from '@f/map'

/**
 * API Request Functions
 */

const {get, put, post, del} = map(fn => xargs(fn, url => join(process.env.API_SERVER, url)), http)

/**
 * Join
 */

function join (a, b) {
  return a[a.length - 1] === '/' && b[0] === '/'
    ? a + b.slice(1)
    : a + b
}

/**
 * Exports
 */

export {
  get,
  put,
  post,
  del
}
