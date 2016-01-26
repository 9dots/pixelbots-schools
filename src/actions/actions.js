/**
 * Imports
 */

import {bind} from 'redux-effects'
import createAction from '@f/create-action'
import {bindUrl} from 'redux-effects-location'
import {cookie} from 'redux-effects-cookie'
import {fetch} from 'redux-effects-fetch'

/**
 * Actions
 */

function initializeApp () {
  return [
    bindUrl(urlDidUpdate),
    initializeUser()
  ]
}

function initializeUser () {
  return bind(cookie('authToken'), token => [
    userDidAuthenticate(token),
    bind(
      getCurrentUser(),
      ({value}) => userDidLoad(value),
      () => userDidLoad({result: null})
    )
  ])
}

function getCurrentUser () {
  return fetch('http://localhost:1337/user/')
}

const userDidAuthenticate = createAction('User did authenticate')
const userDidLoad = createAction('User did load')
const urlDidUpdate = createAction('URL did update')

/**
 * Exports
 */

export {
  initializeApp,
  userDidAuthenticate,
  userDidLoad,
  urlDidUpdate,
}
