/**
 * Imports
 */

import {Tooltip} from 'vdux-containers'
import badge from './ccbadge30x30.png'
import element from 'vdux/element'

/**
 * commoncoreBadge
 */

function render ({props, state}) {
  return (
    <Tooltip message='Common Core Aligned'>
      <img src={badge} />
    </Tooltip>
  )
}

/**
 * Exports
 */

export default {
  render
}
