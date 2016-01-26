/**
 * Imports
 */

import Router from 'components/router'
import {initializeApp} from 'actions'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * app
 */

function onCreate () {
  return initializeApp()
}

function render ({props}) {
  return <Router {...props.state} />
}

/**
 * Exports
 */

export default {
  onCreate,
  render
}
