/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'

/**
 * Collection
 */

function collection (name, get) {
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

  reducer.fetch = function *fetch (opts) {
    const res = yield reducer.request()
    try {
      const res = yield get(opts)
      yield reducer.success(res.value)
    } catch (err) {
      yield reducer.failure(err)
    }
  }

  return reducer
}

/**
 * Exports
 */

export default collection
