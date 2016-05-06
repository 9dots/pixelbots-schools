/**
 * Imports
 */

import Link from 'components/Link'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <NavTile/>
 */

function render ({props, children}) {
  const {highlight} = props

  return (
    <Block px={10}>
      <Link
        pointer
        display='inline-block'
        fs='xxs'
        px={15}
        uppercase
        h={46}
        lh='46px'
        textAlign='center'
        borderBottom='3px solid transparent'
        transition='all 0.2s'
        currentProps={{borderBottomColor: highlight}}
        hoverProps={{borderBottomColor: highlight}}
        {...props}>
        {children}
      </Link>
    </Block>
   )
 }

/**
 * Exports
 */

export default {
  render
}
