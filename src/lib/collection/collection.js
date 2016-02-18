/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'

/**
 * Collection
 */

function collection (name) {
  const request = createAction('requesting collection: ' + name)
  const success = createAction('request collection success: ' + name)
  const failure = createAction('request collection failure: ' + name)
  const destroy = createAction('destroy collection: ' + name)

  const reducer = handleActions({
    [request]: state => ({
      ...state,
      loading: true
    }),
    [success]: (state, {result = [], nextPageToken}) => ({
      ...state,
      loading: false,
      ids: [...(state.ids || []), ...result],
      nextPageToken
    }),
    [failure]: (state, error) => ({
      ...state,
      loading: false,
      error
    }),
    [destroy]: state => ({})
  }, {
    loading: false,
    error: null,
    ids: [],
    nextPageToken: null
  })

  reducer.request = request
  reducer.success = success
  reducer.failure = failure
  reducer.destroy = destroy

  return reducer
}

/**
 * Exports
 */

export default collection
