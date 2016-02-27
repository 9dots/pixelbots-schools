/**
 * Imports
 */

import {bindUrl} from 'redux-effects-location'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'

/**
 * Actions
 */

const urlDidUpdate = createAction('URL did update')

function *watchUrl () {
  yield bindUrl(urlDidUpdate)
}

/**
 * Reducer
 */

const reducer = handleActions({
  [urlDidUpdate]: (state, url) => url
})

/**
 * Exports
 */

export default reducer
export {
  watchUrl
}
