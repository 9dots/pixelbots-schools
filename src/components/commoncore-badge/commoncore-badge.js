/**
 * Imports
 */

import Tooltip from 'components/tooltip'
import badge from './ccbadge30x30.png'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * commoncoreBadge
 */

function render ({props}) {
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
