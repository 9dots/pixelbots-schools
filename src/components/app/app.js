/**
 * Imports
 */

import Router from 'components/router'
import {initializeApp} from 'actions'
import Loading from 'pages/loading'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * app
 */

function onCreate () {
  return initializeApp()
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
