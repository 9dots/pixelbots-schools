/**
 * Imports
 */

import {urlDidUpdate} from 'actions'
import handleActions from '@f/handle-actions'

/**
 * Reducer
 */

const reducer = handleActions({
  [urlDidUpdate]: (state, url) => url
})

/**
 * Exports
 */

export default reducer
