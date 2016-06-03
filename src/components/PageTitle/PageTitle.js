/**
 * Imports
 */

import {setTitle} from 'middleware/title'
import element from 'vdux/element'

/**
 * onCreate
 */

function onCreate ({props}) {
  return setTitle(props.title || 'Weo')
}

/**
 * <PageTitle/>
 */

function render ({props}) {
  return (
    <span/>
  )
}

/**
 * onUpdate
 */

function onUpdate (prev, {props}) {
  return setTitle(props.title || 'Weo')
}

/**
 * Exports
 */

export default {
  onCreate,
  render,
  onUpdate
}
