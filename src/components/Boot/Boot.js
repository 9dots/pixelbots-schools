/**
 * Imports
 */

import {initializeAuth} from 'reducer/auth'
import {watchUrl} from 'reducer/url'
import element from 'vdux/element'
import App from 'components/App'

/**
 * onCreate
 */

function onCreate ({props, state}) {
  return [
    initializeAuth(),
    watchUrl()
  ]
}

/**
 * <Boot/>
 */

function render ({props}) {
  return (
    props.state.auth.token !== undefined
      ? <App {...props} />
      : <span/>
  )
}

/**
 * Exports
 */

export default {
  onCreate,
  render
}
