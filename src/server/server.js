/**
 * Imports
 */

import render from './render'
import 'regenerator-runtime'
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
