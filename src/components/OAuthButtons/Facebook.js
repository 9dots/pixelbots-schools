/**
 * Imports
 */

import {LogoButton} from 'vdux-ui'
import element from 'vdux/element'
import {fbIcon} from 'lib/assets'

/**
 * Facebook OAuth Button
 */

function render ({props, children}) {
  return (
    <LogoButton fs='12px' logo={fbIcon} logoSize='18px' pl='8px' bgColor='facebook_blue' {...props}>
      {children}
    </LogoButton>
  )
}

/**
 * Exports
 */

export default {
  render
}
