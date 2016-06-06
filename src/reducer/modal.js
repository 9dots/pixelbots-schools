/**
 * Imports
 */

import createAction from '@f/create-action'
import handleActions from '@f/handle-actions'
import {urlDidUpdate} from './url'

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
  [closeModal]: (state, modal) => null,
  // Also close modals on route change
  [urlDidUpdate]: (state, modal) => null
})

/**
 * Exports
 */

export default reducer
export {
  openModal,
  closeModal
}
