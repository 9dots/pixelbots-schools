/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import {appIsInitializing, appDidInitialize} from 'actions'

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
