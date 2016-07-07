/**
 * Imports
 */

import {Button} from 'vdux-containers'
import {Icon} from 'vdux-ui'
import WeoIcon from 'components/WeoIcon'
import element from 'vdux/element'

/**
 * <OutlineButton/>
 */

function render ({props, children}) {
  const { icon, weoIcon, color = 'text', bgColor, ...rest } = props
  const m = children.length ? 's' : 0

  return (
    <Button
      border={'1px solid ' + (bgColor ? 'rgba(0,0,0, .2)' : color)}
      color={bgColor ? 'white' : color}
      hoverProps={{highlight: 0.02}}
      focusProps={{highlight: 0.02}}
      bgColor={bgColor || 'white'}
      h='32px'
      px='8px'
      mr='s'
      {...rest}>
        { icon && <Icon name={icon} fs='s' mr={m} /> }
        { weoIcon && <WeoIcon name={weoIcon} fs='s' mr={m} /> }
        { children }
    </Button>
  )
}

/**
 * Exports
 */

export default {
  render
}
