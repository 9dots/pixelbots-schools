/**
 * Imports
 */

import 'lib/favicon'
import 'regenerator-runtime/runtime'
import promise from 'es6-promise'

/**
 * Polyfills
 */

promise.polyfill()

/**
 * Boot app
 */

require('./main')
