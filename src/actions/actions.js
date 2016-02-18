/**
 * Imports
 */

import {bindUrl, setUrl} from 'redux-effects-location'
import createAction from '@f/create-action'
import {cookie} from 'redux-effects-cookie'
import {following} from 'lib/ducks'
import {user} from 'lib/api'
import noop from '@f/noop'

/**
 * Actions
 */

function *initializeApp () {
  yield bindUrl(urlDidUpdate)
  yield appIsInitializing()
  yield initializeAuth()
  yield initializeUser()
  yield appDidInitialize()
}

function *initializeAuth () {
  const token = yield cookie('authToken')
  yield userDidAuthenticate(token)
}

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
    yield cookie('authToken', res.value.token)
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

function *getHomeFeed () {
  yield following.request()
  try {
    const res = yield user.getHomeFeed()
    yield following.success(res.value)
  } catch (err) {
    yield following.failure(err)
  }
}

function *logoutUser () {
  yield cookie('authToken', '')
  yield userDidLogout()
  yield setUrl('/')
}

const appIsInitializing = createAction('App is initializing')
const appDidInitialize = createAction('App did initialize')
const userDidAuthenticate = createAction('User did authenticate')
const userDidLoad = createAction('User did load')
const urlDidUpdate = createAction('URL did update')

const userDidLogin = createAction('User did login')
const userLoginFailed = createAction('User login failed')
const userDidLogout = createAction('User did logout')

/**
 * Exports
 */

export {
  initializeApp,
  appIsInitializing,
  appDidInitialize,
  userDidAuthenticate,
  userDidLogout,
  userDidLoad,
  urlDidUpdate,
  loginUser,
  logoutUser,
  getHomeFeed
}
