/**
 * Imports
 */

import createAction from '@f/create-action'
import handleActions from '@f/handle-actions'

/**
 * Actions
 */

const appIsInitializing = createAction('App is initializing')
const appDidInitialize = createAction('App did initialize')

/**
 * Ready-state reducer
 */

const reducer = handleActions({
  [appIsInitializing]: () => false,
  [appDidInitialize]: () => true
})

/**
 * Exports
 */

export default reducer
export {
  appIsInitializing,
  appDidInitialize
}
