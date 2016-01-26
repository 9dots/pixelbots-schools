/**
 * Imports
 */

import combineReducers from '@f/combine-reducers'
import currentUserReducer from './currentUser'
import authReducer from './auth'
import urlReducer from './url'

/**
 * Reducer
 */

const reducer = combineReducers({
  url: urlReducer,
  auth: authReducer,
  currentUser: currentUserReducer
})

/**
 * Exports
 */

export default reducer
