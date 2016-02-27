/**
 * Imports
 */

import {cookie} from 'redux-effects-cookie'
import createAction from '@f/create-action'
import handleActions from '@f/handle-actions'
import combineReducers from '@f/combine-reducers'

/**
 * Actions
 */

const userDidAuthenticate = createAction('User did authenticate')

function *initializeAuth () {
  const token = yield getAuthToken()
  yield userDidAuthenticate(token)
}

function *setAuthToken (token) {
  yield cookie('authToken', token)
}

function *getAuthToken () {
  const token = yield cookie('authToken')
  return token
}

/**
 * Reducer
 */

const reducer = combineReducers({
  token: handleActions({
    [userDidAuthenticate]: (state, token) => token
  })
})

/**
 * Exports
 */

export default reducer
export {
  initializeAuth,
  setAuthToken,
  getAuthToken,
  userDidAuthenticate
}
