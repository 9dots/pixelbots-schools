/**
 * Imports
 */

import createAction from '@f/create-action'
import handleActions from '@f/handle-actions'

/**
 * Actions
 */

const openModal = createAction('Open modal')
const closeModal = createAction('Close modal')

/**
 * Reducer
 */

const reducer = handleActions({
  [openModal]: (state, modal) => modal,
  [closeModal]: state => null
})

/**
 * Exports
 */

export default reducer
export {
  openModal,
  closeModal
}
