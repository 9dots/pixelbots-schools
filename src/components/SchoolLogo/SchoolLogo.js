/**
 * Imports
 */

import {imageLoaded} from 'vdux-containers'
import {component, element} from 'vdux'
import resize from 'lib/resize-image'
import {Avatar} from 'vdux-ui'
import theme from 'lib/theme'

/**
 * Config
 */

const {AVATAR_SERVER} = process.env

/**
 * <Avatar/>
 */

export default imageLoaded(({school, thumb}) => logoUrl(school, thumb))(component({
  render ({props, state, actions}) {
    const {school, thumb, link, isLoaded} = props

    return <Avatar
      hidden={!isLoaded}
      bgColor='grey_light'
      onClick={link && context.setUrl(`/school/${school._id}`)}
      src={logoUrl(state.loadFailed ? 'default' : school, thumb)}
      onError={actions.loadFailed}
      pointer={link}
      {...props} />
  },

  reducer: {
    loadFailed: () => ({loadFailed: true})
  }
}))

/**
 * Helpers
 */

function logoUrl (school, thumb) {
  const {avatarScale} = theme
  return thumb ? resize(school.logo, avatarScale['s']) : school.logo
}
