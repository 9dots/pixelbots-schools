/**
 * Imports
 */

import createAction from '@f/create-action'
import handleActions from '@f/handle-actions'

/**
 * Actions
 */

const avatarDidUpdate = createAction('Avatar did update')

/**
 * Reducer
 */

const reducer = handleActions({
  [avatarDidUpdate]: state => state + 1
}, 0)

/**
 * Exports
 */

export default reducer
export {
  avatarDidUpdate
}
