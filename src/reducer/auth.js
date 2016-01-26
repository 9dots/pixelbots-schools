/**
 * Imports
 */

import {userDidAuthenticate} from 'actions'
import handleActions from '@f/handle-actions'
import combineReducers from '@f/combine-reducers'

/**
 * Reducer
 */

const reducer = combineReducers({
  token: handleActions({
    [userDidAuthenticate]: (state, token) => token
  })
})

/**
 * Exports
 */

export default reducer
