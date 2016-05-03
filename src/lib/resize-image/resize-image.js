/**
 * Imports
 */

import qs from 'qs'

/**
 * Resize an image using our resizing server
 */

function resize (url, opts = {}) {
  if (typeof opts === 'number') opts = {width: opts}

  return [process.env.IMAGE_RESIZE, qs.stringify({...opts, url})]
    .filter(Boolean)
    .join('?')
}

/**
 * Exports
 */

export default resize
