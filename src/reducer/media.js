/**
 * Imports
 */

import {watchMedia} from 'redux-effects-media'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'

/**
 * Setup media query watchers we care about
 */

function initializeMedia () {
  return watchMedia({
    print: 'print',
    xs: 'screen and (max-width: 599px)',
    sm: 'screen and (min-width: 600px) and (max-width: 959px)',
    md: 'screen and (min-width: 960px) and (max-width: 1279px)',
    lg: 'screen and (min-width: 1280px)'
  }, mediaDidUpdate)
}

/**
 * Actions
 */

const mediaDidUpdate = createAction('Media query updated')

/**
 * Reducer
 */

const reducer = handleActions({
  [mediaDidUpdate]: (state, {key, matches}) => state === key
    ? matches ? key : null
    : matches ? key : state
})

/**
 * Exports
 */

export default reducer
export {
  initializeMedia,
  mediaDidUpdate
}
