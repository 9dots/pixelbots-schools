/**
 * Imports
 */

import ready, {appIsInitializing, appDidInitialize} from './ready'
import currentUser, {initializeUser} from './currentUser'
import combineReducers from '@f/combine-reducers'
import auth, {initializeAuth} from './auth'
import collections from './collections'
import url, {watchUrl} from './url'
import entities from './entities'

/**
 * Actions
 */

function *initializeApp (ready) {
  yield watchUrl()

  if (!ready) {
    yield appIsInitializing()
    yield initializeAuth()
    yield initializeUser()
    yield appDidInitialize()
  }
}

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
export {
  initializeApp
}
