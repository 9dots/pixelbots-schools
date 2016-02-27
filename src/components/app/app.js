/**
 * Imports
 */

import Router from 'components/router'
import {initializeApp} from 'reducer'
import Loading from 'pages/loading'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Root app component
 */

function *onCreate ({props}) {
  yield initializeApp(props.state.ready)
}

function render ({props}) {
  return isReady(props.state)
    ? <Router {...props.state} />
    : <Loading />
}

/**
 * Helpers
 */

function isReady (state) {
  return state.ready
}

/**
 * Exports
 */

export default {
  onCreate,
  render
}
