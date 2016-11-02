/**
 * Imports
 */

import {setupStylePrefixer} from 'vdux-ui'
import middleware from './middleware'
import Boot from 'components/Boot'
import vdux from 'vdux/string'
import {element} from 'vdux'

/**
 * Render to string
 */

function render (opts) {
  let title

  setupStylePrefixer(opts.headers['user-agent'])

  return vdux(() => <Boot />, {
    middleware: middleware(opts, _title => (title = _title))
  }).then(res => ({...res, title}), err => console.log('caught err', err))
}

/**
 * Exports
 */

export default render
