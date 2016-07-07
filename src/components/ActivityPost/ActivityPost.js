/**
 * Imports
 */

import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <ActivityPost/>
 */

function render ({props}) {
  const {object} = props

  return (
    <Block p={24} fs='s' fw='100' lh='1.5em'>
      <Block innerHTML={object.content} />
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
