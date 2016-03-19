/**
 * Imports
 */

import Tooltip from 'components/tooltip'
import element from 'vdux/element'
import {Button} from 'vdux-ui'

/**
 * Button
 */

function render ({props, children}) {
  const {text, tooltip, ttPlacement} = props
  const vnode = <Button {...props}>{children}</Button>

  if (tooltip) {
    return (
      <Tooltip message={tooltip} placement={ttPlacement}>
        {vnode}
      </Tooltip>
    )
  }

  return vnode
}

/**
 * Exports
 */

export default {
  render
}
