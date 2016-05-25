/**
 * Imports
 */

import {setUrl} from 'redux-effects-location'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import resize from 'lib/resize-image'
import element from 'vdux/element'
import {Avatar} from 'vdux-ui'
import theme from 'lib/theme'

/**
 * Config
 */

const {AVATAR_SERVER} = process.env

/**
 * Avatar component
 */

function render ({props, state, local}) {
  const {actor, circle, thumb, size, link} = props

  return <Avatar
    bgColor='greylight'
    onClick={() => (link && setUrl(`/${actor.username}/boards`))}
    src={avatarUrl(state.loadFailed ? 'default' : actor, thumb)}
    onError={local(loadFailed)}
    pointer={link}
    {...props} />
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

function avatarUrl (actor, thumb) {
  const {avatarScale} = theme
  const url = AVATAR_SERVER + '/avatar/' + (actor.id || actor._id || actor)
  return thumb ? resize(url, avatarScale['s']) : url
}

/**
 * Exports
 */

export default {
  render,
  reducer
}
