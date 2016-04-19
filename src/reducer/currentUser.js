/**
 * Imports
 */

import {setAuthToken, userDidAuthenticate} from './auth'
import {beginOAuthFlow} from 'middleware/oauth'
import handleActions from '@f/handle-actions'
import {setUrl} from 'redux-effects-location'
import createAction from '@f/create-action'
import {user} from 'lib/api'
import noop from '@f/noop'

/**
 * Actions
 */

const userDidLoad = createAction('User did load')
const userDidLogout = createAction('User did logout')

function *initializeUser () {
  try {
    const {value} = yield user.getCurrentUser()
    yield userDidLoad(value)
  } catch (err) {
    yield userDidLoad(null)
  }
}

function *loginUser (credentials, cb) {
  const {value} = yield user.login(credentials)
  yield postLogin(value, value.token, cb)
}

function *oauthLogin (provider, params, cb) {
  const data = yield beginOAuthFlow(provider)
  const {value} = yield user.oauthLogin(provider, data)
  yield postLogin(value, value.token, cb)
}

function *oauthCreate (provider, params, cb) {
  const data = yield beginOAuthFlow(provider)
  const {value} = yield user.oauthCreate(provider, data)
  yield postLogin(value, value.token, cb)
}

function *logoutUser () {
  yield setAuthToken('')
  yield userDidLogout()
  yield setUrl('/')
}

function *createTeacher (teacher, cb) {
  const {value} = yield user.createTeacher(teacher)
  yield postLogin(value, value.token, cb)
}

function *createStudent (student, cb) {
  const {value} = yield user.createStudent(student)
  yield postLogin(value, value.token, cb)
}

/**
 * postLogin
 *
 * Actions to perform following a login/create
 * involved in setting up auth and such
 *
 * @api private
 */

function *postLogin (user, token, cb = noop) {
  yield setAuthToken(token)
  yield userDidAuthenticate(token)
  yield userDidLoad(user)
  yield cb(user)
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
  createTeacher,
  createStudent,
  userDidLoad,
  userDidLogout,
  logoutUser,
  oauthLogin,
  oauthCreate
}
