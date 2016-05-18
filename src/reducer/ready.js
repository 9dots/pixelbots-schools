/**
 * Imports
 */

import createAction from '@f/create-action'
import handleActions from '@f/handle-actions'

/**
 * Actions
 */

const appDidInitialize = createAction('App did initialize')

/**
 * Ready-state reducer
 */

const reducer = handleActions({
  [appDidInitialize]: () => true
})

/**
 * Exports
 */

export default reducer
export {
  appDidInitialize
}
