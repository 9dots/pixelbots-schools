/**
 * Imports
 */

import combineReducers from '@f/combine-reducers'
import avatarUpdates from './avatarUpdates'
import ready from './ready'
import modal from './modal'
import auth from './auth'
import url from './url'

/**
 * Reducer
 */

const reducer = combineReducers({
  app: combineReducers({
    ready,
    url,
    auth,
    modal,
    avatarUpdates
  })
})

/**
 * Exports
 */

export default reducer
