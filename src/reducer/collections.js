/**
 * Imports
 */

import combineReducers from '@f/combine-reducers'
import {following, explore} from 'lib/ducks'

/**
 * Collection reducer
 */

const reducer = combineReducers({
  following,
  explore
})

/**
 * Exports
 */

export default reducer
