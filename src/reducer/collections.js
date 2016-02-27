/**
 * Imports
 */

import combineReducers from '@f/combine-reducers'
import createAction from '@f/create-action'
import collection from 'lib/collection'
import {user} from 'lib/api'

/**
 * Collections
 */

const following = collection('following', user.getHomeFeed)
const explore = collection('explore', user.getExploreFeed)

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
export {
  following,
  explore,
}
