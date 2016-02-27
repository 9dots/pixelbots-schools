/**
 * Imports
 */

import 'babel-runtime/regenerator/runtime'
import forEach from '@f/foreach-obj'
import _main from './render'
import page from './page'
import path from 'path'

/**
 * Vars
 */

let main = _main

/**
 * Render
 */

function render (req, urls) {
  return main(req).then(params => page(params, urls), err => console.log('ERROR', err, err.stack))
}

/**
 * Hot reloading
 */

function replace () {
  invalidate(new RegExp('^' + path.resolve('./src')))

  try {
    main = require('./server').default
  } catch (e) {
    console.log('server replace error', e)
  }
}

function invalidate (re) {
  forEach(remove, require.cache)

  function remove (val, key) {
    if (re.test(key)) {
      delete require.cache[key]
    }
  }
}

/**
 * Exports
 */

export default render
export {
  replace
}
