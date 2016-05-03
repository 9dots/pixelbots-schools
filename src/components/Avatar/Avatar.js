/**
 * Imports
 */

import element from 'vdux/element'
import {Avatar} from 'vdux-ui'

/**
 * Config
 */

const {AVATAR_SERVER} = process.env

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
  return AVATAR_SERVER + '/avatar/' + (actor.id || actor._id || actor)
}

/**
 * Exports
 */

export default {
  render
}
