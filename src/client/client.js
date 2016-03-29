/**
 * Imports
 */

import jss from './jss'
import 'babel-runtime/regenerator/runtime'
import promise from 'es6-promise'

/**
 * Polyfills
 */

promise.polyfill()

/**
 * Boot app
 */

require('./main')
