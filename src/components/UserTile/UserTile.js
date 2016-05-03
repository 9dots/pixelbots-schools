/**
 * Imports
 */

import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <UserTile/>
 */

function render ({props}) {
  const {user} = props

  return (
    <Block>
      name: {user.displayName}
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
