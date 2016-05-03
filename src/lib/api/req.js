/**
 * Imports
 */

import * as http from 'lib/http'
import xargs from '@f/xargs'
import map from '@f/map'

/**
 * API Request Functions
 */

const {get, put, post, del} = map(fn =>
  xargs(fn, url => join(process.env.API_SERVER, url)), http)

/**
 * Join
 */

function join (a, b) {
  if (a[a.length - 1] === '/') a = a.slice(-1)
  if (b[0] === '/') b = b.slice(1)

  return a + '/' + b
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
