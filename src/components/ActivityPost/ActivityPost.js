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
    <Block fs='s' fw='100' lh='1.5em' class='markdown' innerHTML={object.content} />
  )
}

/**
 * Exports
 */

export default {
  render
}
