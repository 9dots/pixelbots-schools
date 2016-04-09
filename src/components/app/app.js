/**
 * Imports
 */

import Router from 'components/Router'
import {initializeApp} from 'reducer'
import Loading from 'pages/Loading'
import element from 'vdux/element'

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
