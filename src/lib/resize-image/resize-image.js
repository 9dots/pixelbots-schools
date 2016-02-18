/**
 * Imports
 */

import {imageResize} from 'lib/config'
import qs from 'qs'

/**
 * Resize an image using our resizing server
 */

function resize (url, opts = {}) {
  if (typeof opts === 'number') opts = {width: opts}

  return [imageResize, qs.stringify({...opts, url})]
    .filter(Boolean)
    .join('?')
}

/**
 * Exports
 */

export default resize
