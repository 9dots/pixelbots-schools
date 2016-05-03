/**
 * Imports
 */

import ready, {appIsInitializing, appDidInitialize} from './ready'
import currentUser, {initializeUser} from './currentUser'
import combineReducers from '@f/combine-reducers'
import auth, {initializeAuth} from './auth'
import url, {watchUrl} from './url'
import entities from './entities'
import modal from './modal'

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
  app: combineReducers({
    ready,
    url,
    auth,
    currentUser,
    entities,
    modal
  })
})

/**
 * Exports
 */

export default reducer
export {
  initializeApp
}
