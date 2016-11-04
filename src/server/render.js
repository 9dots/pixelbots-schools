/**
 * Imports
 */

import Boot from 'components/Boot'
import vdux from 'vdux/string'
import {element} from 'vdux'

/**
 * Render to string
 */

function render (opts) {
  return vdux(() => <Boot req={opts} />, {
    awaitReady: true
  }).then(null, handleError)
}

/**
 * Helpers
 */

function handleError (err) {
  console.log('caught err', err)
  throw err
}

/**
 * Exports
 */

export default render
