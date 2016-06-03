/**
 * Imports
 */

import WeoIcon from 'components/WeoIcon'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <EmptyState/>
 */

function render ({props, children}) {
  const {icon, weoIcon, color, ...rest} = props
  return (
    <Block p textAlign='center' w='col_main' {...rest}>
      {
        weoIcon
          ? <WeoIcon fs='xxl' color={color} name={weoIcon} />
          : <Icon fs='xxl' color={color} name={icon} />
      }
      <Block fs='s' lighter mx='auto' w='col_m'>
        {children}
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
