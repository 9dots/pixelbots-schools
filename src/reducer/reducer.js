/**
 * Imports
 */

import combineReducers from '@f/combine-reducers'
import ready, {appIsInitializing} from './ready'
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
