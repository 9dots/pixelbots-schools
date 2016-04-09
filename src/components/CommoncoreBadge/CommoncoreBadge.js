/**
 * Imports
 */

import badge from './ccbadge30x30.png'
import Tooltip from 'vdux-tooltip'
import element from 'vdux/element'

/**
 * commoncoreBadge
 */

function render ({props, state}) {
  return (
    <Tooltip delay={300} message='Common Core Aligned' space={15}>
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
