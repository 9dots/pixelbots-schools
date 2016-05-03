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
      items: [],
      loading: true
    }),
    [success]: (state, {items = [], nextPageToken}) => ({
      ...state,
      loading: false,
      items: [...(state.items || []), ...items],
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
    items: [],
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
