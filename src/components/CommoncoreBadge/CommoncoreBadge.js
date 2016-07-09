/**
 * Imports
 */

import {Tooltip} from 'vdux-containers'
import badge from './ccbadge30x30.png'
import element from 'vdux/element'

/**
 * commoncoreBadge
 */

function render ({props}) {
  return (
    <Tooltip message='Common Core Aligned' {...props}>
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
