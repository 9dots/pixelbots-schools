/**
 * Imports
 */

import Tooltip from 'components/Tooltip'
import element from 'vdux/element'
import Hover from 'vdux-hover'
import {Button} from 'vdux-ui'

/**
 * Button
 */

function render ({props, children}) {
  const {text, tooltip, ttPlacement, hover = true} = props
  const btn = hover => <Button opacity={hover ? 1 : 0.9} {...props}>{children}</Button>
  const vnode = hover
    ? <Hover>{btn}</Hover>
    : btn(false)

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
