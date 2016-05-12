/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import element from 'vdux/element'
import {Avatar} from 'vdux-ui'

/**
 * Config
 */

const {AVATAR_SERVER} = process.env

/**
 * Avatar component
 */

function render ({props, state, local}) {
  const {actor, circle, size} = props

  return <Avatar
    {...props}
    src={avatarUrl(state.loadFailed ? 'default' : actor)}
    onError={local(loadFailed)} />
}

/**
 * Actions
 */

const loadFailed = createAction('<Avatar/>: Image load failed')

/**
 * Reducer
 */

const reducer = handleActions({
  [loadFailed]: state => ({
    ...state,
    loadFailed: true
  })
})

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
  render,
  reducer
}
