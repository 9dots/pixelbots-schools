/**
 * Imports
 */

import {setUrl} from 'redux-effects-location'
import element from 'vdux/element'

/**
 * onCreate
 */

function onCreate ({props}) {
  return setUrl(props.to)
}

/**
 * <Redirect/>
 */

function render ({props}) {
  return <span/>
}

/**
 * Exports
 */

export default {
  onCreate,
  render
}
