/**
 * Imports
 */

import 'regenerator-runtime/runtime'
import render from './render'
import page from './page'

/**
 * Handle requests
 */

function handler (event) {
  return render(event).then(page)
}

/**
 * Exports
 */

export default handler
