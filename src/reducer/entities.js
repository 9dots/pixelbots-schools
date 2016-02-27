/**
 * Imports
 */

import has from '@f/has'
import createAction from '@f/create-action'

/**
 * Entities reducer
 */

function reducer (state, action) {
  if (action.payload && has('entities', action.payload)) {
    return {
      ...state,
      ...action.payload.entities
    }
  }

  return state
}

/**
 * Exports
 */

export default reducer
