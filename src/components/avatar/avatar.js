/**
 * Imports
 */

import {avatarServer} from 'lib/config'
import Figure from 'components/figure'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Sizes
 */

const sizes = {
  small: '25px',
  default: '32px',
  medium: '40px',
  large: '100px'
}


/**
 * Avatar component
 */

function render ({props}) {
  const {actor, size = 'default'} = props
  const dim = sizes[size]

  return (
    <div class={avatar} style={{width: dim, height: dim}}>
      <Figure url={avatarUrl(actor)} ratio='1' />
    </div>
  )
}

/**
 * Styles
 */

const {avatar} = css({
  avatar: {
    borderRadius: '50%',
    overflow: 'hidden'
  }
})

/**
 * Helpers
 */

function avatarUrl (actor) {
  return avatarServer + (actor.id || actor)
}

/**
 * Exports
 */

export default {
  render
}
