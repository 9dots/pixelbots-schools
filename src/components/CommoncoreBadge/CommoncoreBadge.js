/**
 * Imports
 */

import Tooltip from 'components/Tooltip'
import badge from './ccbadge30x30.png'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * commoncoreBadge
 */

function render ({props, state}) {
  return (
    <Tooltip message='Common Core Aligned' space={15}>
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
