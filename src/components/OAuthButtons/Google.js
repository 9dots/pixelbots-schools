/**
 * Imports
 */

import {gplusIcon} from 'lib/assets'
import {LogoButton} from 'vdux-ui'
import element from 'vdux/element'

/**
 * Google OAuth Button
 */

function render ({props, children}) {
  return (
    <LogoButton fs='12px' logo={gplusIcon} bgColor='google_red' {...props}>
      {children}
    </LogoButton>
  )
}

/**
 * Exports
 */

export default render
