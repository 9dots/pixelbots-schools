/**
 * Imports
 */

import {setUrl} from 'redux-effects-location'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {imageLoaded} from 'vdux-containers'
import resize from 'lib/resize-image'
import element from 'vdux/element'
import {Avatar} from 'vdux-ui'
import theme from 'lib/theme'

/**
 * Config
 */

const {AVATAR_SERVER} = process.env

/**
 * getProps - Get the avatarUpdates count
 * from the global state atom
 */

function getProps (props, {avatarUpdates = 0}) {
  props.avatarUpdates = avatarUpdates
  return props
}

/**
 * Avatar component
 */

function render ({props, state, local}) {
  const {actor, circle, thumb, size, link, isLoaded, avatarUpdates} = props

  return <Avatar
    hidden={!isLoaded}
    bgColor='grey_light'
    onClick={() => (link && setUrl(`/${actor.username}/boards`))}
    src={avatarUrl(state.loadFailed ? 'default' : actor, thumb, avatarUpdates)}
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

function avatarUrl (actor, thumb, avatarUpdates) {
  const {avatarScale} = theme
  const url = `${AVATAR_SERVER}/avatar/${actor.id || actor._id || actor}?updates=${avatarUpdates}`

  return thumb ? resize(url, avatarScale['s']) : url
}

/**
 * Exports
 */

export default imageLoaded(({actor, thumb, avatarUpdates}) => avatarUrl(actor, thumb, avatarUpdates))({
  getProps,
  render,
  reducer
})
