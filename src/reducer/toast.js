/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import sleep from '@f/sleep'

/**
 * Actions
 */

const showToast = createAction('Show toast')
const hideToast = createAction('Hide toast')

function * toast (fn, time = 3000) {
  yield showToast(fn)
  yield sleep(time)
  yield hideToast()
}

/**
 * Reducer
 */

const reducer = handleActions({
  [showToast]: (state, toast) => toast,
  [hideToast]: state => null
})

/**
 * Exports
 */

export default reducer
export {
  showToast,
  hideToast,
  toast
}
