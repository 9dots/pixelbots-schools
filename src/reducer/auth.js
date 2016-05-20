/**
 * Imports
 */

import combineReducers from '@f/combine-reducers'
import {beginOAuthFlow} from 'middleware/oauth'
import handleActions from '@f/handle-actions'
import {setUrl} from 'redux-effects-location'
import {cookie} from 'redux-effects-cookie'
import createAction from '@f/create-action'
import {invalidate} from 'vdux-summon'
import {user} from 'lib/api'

/**
 * Actions
 */

const userDidAuthenticate = createAction('User did authenticate')

function * initializeAuth () {
  const token = yield getAuthToken()
  yield userDidAuthenticate(token)
}

function * setAuthToken (token) {
  yield cookie('authToken', token, {path: '/'})
  yield userDidAuthenticate(token)
}

function * getAuthToken () {
  return yield cookie('authToken')
}

function * postLogin (token) {
  yield setAuthToken(token)
  yield invalidate('/user')
  yield setUrl('/')
}

function * oauthLogin (provider, params, cb) {
  const data = yield beginOAuthFlow(provider)
  const {value} = yield user.oauthLogin(provider, data)
  yield postLogin(value.token)
}

function * logoutUser () {
  yield postLogin('')
}

function *oauthCreate (provider, params) {
  const data = yield beginOAuthFlow(provider)
  const {value} = yield user.oauthCreate(provider, data)
  yield postLogin(value.token)
}

/**
 * Reducer
 */

const reducer = combineReducers({
  token: handleActions({
    [userDidAuthenticate]: (state, token) => token || ''
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
  postLogin,
  oauthLogin,
  oauthCreate,
  logoutUser
}
