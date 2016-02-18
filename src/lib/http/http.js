/**
 * Imports
 */

import {fetch} from 'redux-effects-fetch'

/**
 * Wrappers
 */

function post (url, body, opts = {}) {
  const headers = opts.headers || {}

  return fetch(url, {
    ...opts,
    method: 'post',
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

function get (url, opts) {
  return fetch(url, opts)
}

function del (url, opts) {
  return fetch(url, {
    ...opts,
    method: 'delete'
  })
}

function put (url, body, opts = {}) {
  const headers = opts.headers || {}

  return fetch(url, {
    ...opts,
    method: 'put',
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

/**
 * Exports
 */

export {
  post,
  get,
  del,
  put
}
