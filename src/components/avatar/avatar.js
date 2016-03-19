/**
 * Imports
 */

import {avatarServer} from 'lib/config'
import element from 'vdux/element'
import {Avatar} from 'vdux-ui'

/**
 * Avatar component
 */

function render ({props}) {
  const {actor, circle, size} = props
  return <Avatar {...props} src={avatarUrl(actor)} />
}

/**
 * Helpers
 */

function avatarUrl (actor) {
  return avatarServer + (actor.id || actor._id || actor)
}

/**
 * Exports
 */

export default {
  render
}
