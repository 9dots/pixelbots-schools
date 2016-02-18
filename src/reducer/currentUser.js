/**
 * Imports
 */

import {userDidLoad, userDidLogout} from 'actions'
import handleActions from '@f/handle-actions'

/**
 * Reducer
 */

const reducer = handleActions({
  [userDidLoad]: (state, user) => user,
  [userDidLogout]: (state, user) => null
})

/**
 * Exports
 */

export default reducer
