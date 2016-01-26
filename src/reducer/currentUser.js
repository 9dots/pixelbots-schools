/**
 * Imports
 */

import {userDidLoad} from 'actions'
import handleActions from '@f/handle-actions'

/**
 * Reducer
 */

const reducer = handleActions({
  [userDidLoad]: (state, user) => user
})

/**
 * Exports
 */

export default reducer
