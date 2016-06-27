/**
 * Imports
 */

import {setUrl} from 'redux-effects-location'
import element from 'vdux/element'

/**
 * onCreate
 */

function onCreate ({props}) {
  return setUrl(props.to, true)
}

/**
 * <Redirect/>
 */

function render ({props}) {
  return <span/>
}

/**
 * onUpdate
 *
 * Support multiple redirects (the original redirect may
 * not be destroyed in the diff if we've just swapped the
 * url)
 */

function onUpdate (prev, {props}) {
  return setUrl(props.to, true)
}

/**
 * Exports
 */

export default {
  onCreate,
  onUpdate,
  render
}
