/**
 * Imports
 */

import combineReducers from '@f/combine-reducers'
import collections from './collections'
import currentUser from './currentUser'
import entities from './entities'
import ready from './ready'
import auth from './auth'
import url from './url'

/**
 * Reducer
 */

const reducer = combineReducers({
  ready,
  url,
  auth,
  currentUser,
  entities,
  collections
})

/**
 * Exports
 */

export default reducer
