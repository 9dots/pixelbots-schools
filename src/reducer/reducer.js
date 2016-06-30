/**
 * Imports
 */

import combineReducers from '@f/combine-reducers'
import avatarUpdates from './avatarUpdates'
import media from './media'
import ready from './ready'
import modal from './modal'
import toast from './toast'
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
    toast,
    media,
    avatarUpdates
  })
})

/**
 * Exports
 */

export default reducer
