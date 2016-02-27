/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import {setUrl} from 'redux-effects-location'
import createAction from '@f/create-action'
import {setAuthToken, userDidAuthenticate} from './auth'
import {user} from 'lib/api'
import noop from '@f/noop'

/**
 * Actions
 */

const userDidLoad = createAction('User did load')
const userDidLogin = createAction('User did login')
const userLoginFailed = createAction('User login failed')
const userDidLogout = createAction('User did logout')

function *initializeUser () {
  try {
    const res = yield user.getCurrentUser()
    yield userDidLoad(res.value)
  } catch (err) {
    yield userDidLoad(null)
  }
}

function *loginUser (credentials, cb = noop) {
  try {
    const res = yield user.login(credentials)
    yield setAuthToken(res.value.token)
    yield userDidAuthenticate(res.value.token)
    yield userDidLogin(res.value)
    yield userDidLoad(res.value)
    yield cb(res.value)
    yield setUrl('/')
  } catch (err) {
    yield userLoginFailed(err.value)
    yield cb(null, err.value)
  }
}

function *logoutUser () {
  yield setAuthToken('')
  yield userDidLogout()
  yield setUrl('/')
}

/**
 * Reducer
 */

const reducer = handleActions({
  [userDidLoad]: (state, user) => user,
  [userDidLogout]: (state, user) => null
})

/**
 * Exports
 */

export default reducer
export {
  initializeUser,
  loginUser,
  userDidLoad,
  userDidLogin,
  userLoginFailed,
  userDidLogout
}
