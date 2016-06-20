/**
 * Imports
 */

import app from 'client/main'
import {mediaDidUpdate} from 'reducer/media'

/**
 * Types
 */

const type = mediaDidUpdate.toString()

/**
 * Print Middleware
 *
 * This is moderately janks. Why is this necessary? Because when the print
 * media query updates, we *must* re-render the page in the current event
 * loop if we want the new page to be represented in the print preview.
 *
 * This means that vdux's normal debounced re-render is insufficient for our
 * needs in this one, highly unusual case. So, instead, we simply do an
 * explicit rerender here on our own just to support this use case.
 */

function middleware ({getState, dispatch}) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

  // Correct for the fact that media query listeners do not work with printing
  // in firefox, but these before/after print queries do
  if (isFirefox) {
    window.addEventListener('beforeprint', function () {
      dispatch(mediaDidUpdate({key: 'print', matches: true}))
    })

    window.addEventListener('afterprint', function () {
      dispatch(mediaDidUpdate({key: 'print', matches: false}))
    })
  }

  return next => action => {
    const result = next(action)

    if (action.type === type
      && action.payload.key === 'print'
      && action.payload.matches) {
      app(getState())
    }

    return result
  }
}

/**
 * Exports
 */

export default middleware
